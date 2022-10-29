// DEPENDENCIES
import * as mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';

const connection = (handler) => async (req:NextApiRequest, res:NextApiResponse) => {
  if (mongoose.connections[0].readyState) {
    // Use current db connection
    return handler(req, res);
  }

  // Use new db connection
  await mongoose.connect(process.env.MONGODB_URI, {
    dbName: process.env.DB_NAME,
    authSource: 'admin',
    user: process.env.DB_USER,
    pass: process.env.DB_PASSWORD,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true,
  });
  return handler(req, res);
};

export default connection;
