import type { NextApiRequest, NextApiResponse } from 'next';
import connection from '../../../utils/config/database';
import { ShopModel } from '../../../utils/models';
import { verifyRefreshToken } from '../../../utils/auth';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const response = verifyRefreshToken(req, res);

      if (!response.success) {
        return res.status(response.status).send(response.msg);
      }

      const all = await ShopModel.find();

      return res.status(200).json({
        success: true,
        details: all,
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  } else {
    return res.redirect(302, '/error');
  }
};

export default connection(handler);
