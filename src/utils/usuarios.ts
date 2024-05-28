import cleanConfig from 'config/env';
import jwt from 'jsonwebtoken';
import { JWT_TOKEN_EXPIRATION } from '@constants/limits';
import { TokenPayload } from 'types';

const createAccessToken = (userInfo: TokenPayload): string => {
  const secret = cleanConfig.ACCESS_TOKEN_SECRET;

  return jwt.sign(userInfo, secret, { expiresIn: JWT_TOKEN_EXPIRATION });
};

const createRefreshToken = (userInfo: TokenPayload): string => {
  const secret = cleanConfig.REFRESH_TOKEN_SECRET;

  return jwt.sign(userInfo, secret);
};

export {
  createAccessToken,
  createRefreshToken,
};