import * as argon from 'argon2';
import { serialize } from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';
import connection from '../../../utils/config/database';
import { AdminModel } from '../../../utils/models';
import * as auth from '../../../utils/auth';
import * as CSRF from '../../../utils/CSRF';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { email, password } = req.body;

      // Checking required fields
      if (!email || !password) {
        return res.status(400).send('Please fill all the required fields');
      }

      const user = await AdminModel.findOne({ email });

      if (!user) {
        return res.status(400).send('User does not exists');
      }

      const isMatch = await argon.verify(user.password, password);

      if (!isMatch) {
        return res.status(400).send('Password does not match');
      }

      const accessToken: string = await auth.signAccessToken(user);
      const refreshToken: string = await auth.signRefreshToken(user);

      user.RTexpiresIn = +process.env.REFRESH_TOKEN_EXPIRE_IN;
      await user.save();

      res.setHeader('Set-Cookie', [
        serialize('accessToken', accessToken, {
          ...CSRF.SecureCookieObj,
          maxAge: +process.env.ACCESS_TOKEN_EXPIRE_IN,
        }),
        serialize('refreshToken', refreshToken, {
          ...CSRF.SecureCookieObj,
          maxAge: +process.env.REFRESH_TOKEN_EXPIRE_IN,
        }),
      ]);

      const { fullName } = await auth.decodeToken(accessToken, 'trusted');

      return res.status(200).json({
        fullName,
        email,
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  } else {
    return res.redirect(302, '/error');
  }
};

export default connection(handler);
