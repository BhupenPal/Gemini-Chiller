import type { NextApiRequest, NextApiResponse } from 'next';
import connection from '../../../utils/config/database';
import { ContactModel } from '../../../utils/models';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { fullName, email, phoneNumber, views } = req.body;

      // Checking required fields
      if (!fullName || !email || !phoneNumber) {
        return res.status(400).json({
          error: 'Please fill all the required fields',
        });
      }

      await new ContactModel({
        fullName,
        email,
        phoneNumber,
        views,
      }).save();

      return res.status(200).json({
        message: 'Form submitted successfully',
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  } else {
    return res.redirect(302, '/error');
  }
};

export default connection(handler);
