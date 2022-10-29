/* eslint-disable no-underscore-dangle */
import * as JWT from 'jsonwebtoken';
// import createError from 'http-errors';
import { IAdmin } from '../types';

export const signAccessToken = (USER: IAdmin) => new Promise<string>((resolve, reject) => {
  try {
    const Payload = {
      fullName: USER.fullName,
      email: USER.email,
    };
    const secret = process.env.JWT_ACCESS_TOKEN;
    const options = {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE_IN,
      issuer: process.env.DOMAIN_NAME,
      audience: USER._id.toString(),
    };
    const token = JWT.sign(Payload, secret, options);
    // There's a space after Bearer
    return resolve(`Bearer ${token}`);
  } catch (err) {
    return reject(err);
  }
});

// eslint-disable-next-line no-async-promise-executor
export const signRefreshToken = (USER: IAdmin) => new Promise<string>(async (resolve, reject) => {
  try {
    const Payload = {
      fullName: USER.fullName,
      email: USER.email,
    };
    const secret = process.env.JWT_REFRESH_TOKEN;
    const options = {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRE_IN,
      issuer: process.env.DOMAIN_NAME,
      audience: USER._id.toString(),
    };
    const token = JWT.sign(Payload, secret, options);

    return resolve(`Bearer ${token}`);
  } catch (err) {
    return reject(err);
  }
});

export const decodeToken = (BearerToken: string, trusted?: string) => new Promise<any>(
  (resolve) => {
    const Token = BearerToken.split(' ')[1];

    if (trusted !== 'trusted') {
      return resolve(JWT.verify(Token, process.env.JWT_ACCESS_TOKEN));
    }

    return resolve(JWT.decode(Token));
  },
);
