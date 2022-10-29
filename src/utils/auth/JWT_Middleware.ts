import * as JWT from 'jsonwebtoken';
// import createError from 'http-errors';
import type { NextApiResponse } from 'next';

export const verifyAccessToken = (
  req: any,
  res: NextApiResponse,
  next: any,
) => {
  try {
    // if (!req.cookies.accessToken) return next(new createError.Unauthorized());

    const BearerToken = req.cookies.accessToken;
    const Token = BearerToken.split(' ')[1];
    const payload: any = JWT.verify(Token, process.env.JWT_ACCESS_TOKEN);
    req.payload = payload;
    return next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return { success: false, status: 401, msg: 'Unauthorized' };
    }
    return next(error);
  }
};

export const verifyRefreshToken = (req: any, res: NextApiResponse) => {
  try {
    if (!req.cookies.refreshToken) {
      return { success: false, status: 400, msg: 'Refresh Token Not Found' };
    }

    const BearerToken = req.cookies.refreshToken;
    const Token = BearerToken.split(' ')[1];
    const payload: any = JWT.verify(Token, process.env.JWT_REFRESH_TOKEN);

    return { success: true, status: 200, payload };
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return { success: false, status: 401, msg: 'Unauthorized' };
    }
    return { success: false, status: 400, msg: error };
  }
};
