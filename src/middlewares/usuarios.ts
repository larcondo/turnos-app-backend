import { RequestHandler } from 'express';
import { UserRoles, TurnBodyWithAuth, UserRecord } from 'types';
import { RegisterReqBody } from '@controllers/usuarios/types';
import userService from '@services/usuarios';

const checkLoginBody: RequestHandler<unknown, unknown, object, unknown> = (req, res, next) => {
  const body = req.body;
  
  if ('email' in body && 'password' in body) {
    return next();
  } else {
    return res.status(400).send({ message: 'email and password are required!' });
  }
};

const checkRegisterBody: RequestHandler<unknown, unknown, RegisterReqBody, unknown> = (req, res, next) => {
  const { email, nombre, password } = req.body;

  if (!email || !nombre || !password) return res.status(400).send({ message: 'email, password and nombre required!' });

  if (!email.includes('@')) return res.status(400).send({ message: 'invalid email' });
  if (password.length < 6) return res.status(400).send({ message: 'password too short (minimum 6 characters)' });

  return next();
};

const checkIsAdmin: RequestHandler<unknown, unknown, TurnBodyWithAuth, unknown> = async (req, res, next) => {
  const userId = req.body.user.id;

  if (!userId) return res.sendStatus(401);

  try {
    const user = await userService.getById(userId) as UserRecord;
    const isAdmin = user.rol === UserRoles.Admin.valueOf();

    return !isAdmin
      ? res.sendStatus(401)
      : next();

  } catch(err) {
    console.log(err);
    return res.status(500).send({ message: 'Error al verificar privilegios' });
  }
};

export {
  checkLoginBody,
  checkRegisterBody,
  checkIsAdmin,
};