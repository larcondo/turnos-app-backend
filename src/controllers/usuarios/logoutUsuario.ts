import { RequestHandler } from 'express';
import { TokenCookie } from 'types';

const logoutUsuario: RequestHandler = (req, res) => {
  const cookies = req.cookies as TokenCookie;

  if (!cookies.refreshToken) return res.status(200).send({ message: 'No refresh token found.' });

  try {
    res.clearCookie('autologin');
    res.clearCookie('refreshToken');
    return res.status(200).send({ message: 'Logout successfull.' });
  } catch(err) {
    return res.status(500).send({ message: 'Error on logout' });
  }
};

export default logoutUsuario;