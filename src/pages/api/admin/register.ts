/* eslint-disable operator-linebreak */
import type { NextApiRequest, NextApiResponse } from 'next';
import connection from '../../../utils/config/database';
import { AdminModel } from '../../../utils/models';

const PassRegEx =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?([^\w\s]|[_])).{8,16}$/;
export const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { fullName, email, password, secret } = req.body;

      // Checking secret field
      if (!secret || secret !== 'GeminiC') {
        return res.status(400).json({
          error: 'Unauthorized access',
        });
      }

      // Checking required fields
      if (!fullName || !email) {
        return res.status(400).json({
          error: 'Please fill all the required fields',
        });
      }

      if (!EMAIL_REGEX.test(email)) {
        return res.status(400).json({
          error: 'Invalid email address',
        });
      }

      if (!PassRegEx.test(password)) {
        return res.status(400).json({
          error: 'Invalid Password',
        });
      }

      await new AdminModel({
        fullName,
        email,
        password,
      }).save();

      return res.status(200).json({
        message: 'New admin registered successfully',
      });
    } catch (error) {
      if (error.name === 'MongoError' && error.code === 11000) {
        // Setting Error Status 400 For Bad Request
        error.status = 400;
        // Getting duplicate property name & value from error
        const [keyName] = Object.keys(error.keyValue);
        const keyValue = error.keyValue[keyName];
        // Decamelize keyName for user
        error.message = `${keyName}: ${keyValue} already exists`;
      }
      return res.status(500).send(error.message);
    }
  } else {
    return res.redirect(302, '/error');
  }
};

export default connection(handler);
