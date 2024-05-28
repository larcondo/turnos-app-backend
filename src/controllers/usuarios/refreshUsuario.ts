import cleanConfig from 'config/env';
import jwt from 'jsonwebtoken';
import { RequestHandler } from 'express';
import { createAccessToken } from '@utils/usuarios';
import { TokenPayload, TokenCookie, DecodedPayload } from 'types';

const refreshUsuario: RequestHandler = (req, res) => {
  const cookies = req.cookies as TokenCookie;

  if (!cookies?.refreshToken) res.sendStatus(401);
  
  const refreshToken: string = cookies.refreshToken;

  try {
    const secret = cleanConfig.REFRESH_TOKEN_SECRET;
    
    const decoded = jwt.verify(refreshToken, secret) as DecodedPayload;
    const payload: TokenPayload = { id: decoded.id, email: decoded.email };
    const accessToken = createAccessToken(payload);

    return res.send({ accessToken });
  } catch(err) {
    return res.status(500).send({ message: 'Error on refresh token' });
  }
};

export default refreshUsuario;