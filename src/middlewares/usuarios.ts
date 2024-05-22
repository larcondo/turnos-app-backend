import { RequestHandler } from 'express';
import { RegisterUserBody } from 'types';

const checkLoginBody: RequestHandler<unknown, unknown, object, unknown> = (req, res, next) => {
  const body = req.body;
  
  if ('email' in body && 'password' in body) {
    return next();
  } else {
    return res.status(400).send({ message: 'email and password are required!' });
  }
};

const checkRegisterBody: RequestHandler<unknown, unknown, RegisterUserBody, unknown> = (req, res, next) => {
  const { email, nombre, password } = req.body;

  if (!email || !nombre || !password) return res.status(400).send({ message: 'email, password and nombre required!' });

  if (!email.includes('@')) return res.status(400).send({ message: 'invalid email' });
  if (password.length < 6) return res.status(400).send({ message: 'password too short (minimum 6 characters)' });

  return next();
};

export {
  checkLoginBody,
  checkRegisterBody,
};