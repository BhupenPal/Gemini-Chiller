// import * as csurf from 'csurf';

// export const csrfProtection = csurf({
//   cookie: {
//     key: 'X-XSRF-Token',
//     httpOnly: false,
//     signed: process.env.COOKIE_MODE === 'PROD',
//     secure: process.env.COOKIE_MODE === 'PROD',
//     sameSite: process.env.COOKIE_MODE === 'PROD' ? 'strict' : 'lax',
//   },
// });

// eslint-disable-next-line import/prefer-default-export
export const SecureCookieObj = {
  httpOnly: true,
  domain:
    process.env.COOKIE_MODE === 'PROD' ? `.${process.env.DOMAIN_NAME}` : null,
  secure: process.env.COOKIE_MODE === 'PROD',
  sameSite: process.env.COOKIE_MODE === 'PROD' ? 'strict' : ('lax' as any),
  path: '/',
};
