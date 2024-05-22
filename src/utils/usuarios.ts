import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import { TokenPayload } from 'types';

const generateTokens = (userInfo: TokenPayload): string => {
  const secret: string|undefined = process.env['ACCESS_TOKEN_SECRET'];

  if (typeof secret === 'string') {
    return jwt.sign(userInfo, secret);
  } else {
    throw new Error('Access Token Secret is undefined');
  }
};

export {
  generateTokens
};