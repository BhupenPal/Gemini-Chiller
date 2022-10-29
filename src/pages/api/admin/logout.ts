import type { NextApiResponse } from 'next';
import { serialize } from 'cookie';
import * as CSRF from '../../../utils/CSRF';
import connection from '../../../utils/config/database';
import { verifyRefreshToken } from '../../../utils/auth';

const handler = async (req: any, res: NextApiResponse) => {
  if (req.method === 'DELETE') {
    try {
      const payload = verifyRefreshToken(req, res);

      if (!payload.success) {
        console.log(payload);
        return res.status(payload.status).send(payload.msg);
      }

      res.setHeader('Set-Cookie', [
        serialize('accessToken', '', {
          ...CSRF.SecureCookieObj,
          maxAge: -1,
        }),
        serialize('refreshToken', '', {
          ...CSRF.SecureCookieObj,
          maxAge: -1,
        }),
      ]);

      //   await client.DEL(`${(req.payload as any)._id}`);

      return res.status(200).json({
        message: 'User logged out',
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  } else {
    return res.redirect(302, '/error');
  }
};

export default connection(handler);
