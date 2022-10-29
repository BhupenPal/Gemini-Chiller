import type { NextApiResponse } from 'next';
import connection from '../../utils/config/database';
import { verifyRefreshToken } from '../../utils/auth';

const handler = async (req: any, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const response = verifyRefreshToken(req, res);

      if (!response.success) {
        return res.status(response.status).send(response.msg);
      }

      return res.status(200).json({
        fullName: response.payload.fullName,
        email: response.payload.email,
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  } else {
    return res.redirect(302, '/error');
  }
};

export default connection(handler);
