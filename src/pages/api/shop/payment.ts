import type { NextApiRequest, NextApiResponse } from 'next';
import connection from '../../../utils/config/database';
import { ShopModel } from '../../../utils/models';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const {
        paymentId,
        email,
        payerId,
        fullName,
        address,
        amountCurrency,
        amountValue,
        quantity,
      } = req.body;

      // Checking required fields
      if (!fullName || !email || !quantity) {
        return res.status(400).json({
          error: 'Please fill all the required fields',
        });
      }

      await new ShopModel({
        paymentId,
        email,
        payerId,
        fullName,
        address,
        amountCurrency,
        amountValue,
        quantity,
      }).save();

      return res.status(200).json({
        message: 'Payment Successful',
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  } else {
    return res.redirect(302, '/error');
  }
};

export default connection(handler);
