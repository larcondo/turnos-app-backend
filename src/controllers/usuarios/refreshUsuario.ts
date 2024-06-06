import cleanConfig from 'config/env';
import jwt from 'jsonwebtoken';
import userService from '@services/usuarios';
import { RequestHandler } from 'express';
import { createAccessToken } from '@utils/usuarios';
import { TokenPayload, TokenCookie, DecodedPayload, UserRecord } from 'types';

const refreshUsuario: RequestHandler = async (req, res) => {
  const cookies = req.cookies as TokenCookie;

  if (!cookies?.refreshToken) return res.sendStatus(401);
  
  const refreshToken: string = cookies.refreshToken;

  try {
    const secret = cleanConfig.REFRESH_TOKEN_SECRET;
    
    const decoded = jwt.verify(refreshToken, secret) as DecodedPayload;
    const payload: TokenPayload = { id: decoded.id, email: decoded.email };
    const accessToken = createAccessToken(payload);

    const userInfo = await userService.getById(decoded.id) as UserRecord;
    const { nombre, rol } = userInfo;

    return res.send({
      accessToken,
      email: decoded.email,
      nombre,
      rol
    });
  } catch(err) {
    return res.status(500).send({ message: 'Error on refresh token' });
  }
};

export default refreshUsuario;