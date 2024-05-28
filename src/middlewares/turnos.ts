import cleanConfig from 'config/env';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { TurnBody, TokenPayload, TurnBodyWithAuth } from '../types';
import { isValidCancha, isValidDate, isValidTime } from '../utils/turnos';

const validateTurnBody = (req: Request, res:  Response, next: NextFunction) => {
  const { cancha, fecha, inicio, fin } = req.body as TurnBody;

  // Todos los campos
  if ((!cancha) || (!inicio) || (!fin)) {
    return res.status(400).send({ message: 'Se requieren todos los campos [cancha, inicio, fin]' });
  }
  
  // Cancha valida
  if (!isValidCancha(cancha)) {
    return res.status(400).send({ message: 'La cancha no es válida' }); 
  }

  if (!isValidDate(fecha)) {
    return res.status(400).send({
      received: fecha,
      message: 'fecha no es válida [YYYY-MM-DD]'
    }); 
  }
  
  // Inicio y fin formatos validos
  if (!isValidTime(inicio)) {
    return res.status(400).send({
      received: inicio,
      message: 'inicio no es válido [HH:MM]'
    }); 
  }
  if (!isValidTime(fin)) {
    return res.status(400).send({
      received: fin,
      message: 'fin no es válido [HH:MM]'
    });
  }

  return next();
};

const checkAuthorization: RequestHandler<unknown, unknown, TurnBodyWithAuth, unknown> = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) return res.sendStatus(401);

  const auth_array = authorization.split(' ');
  if (auth_array[0] !== 'Bearer') return res.sendStatus(401);

  const token = auth_array[1];

  try {
    const secret = cleanConfig.ACCESS_TOKEN_SECRET;
    const payload = jwt.verify(token, secret);
    req.body.user = payload as TokenPayload;
    return next();
  } catch(err) {
    return (err instanceof JsonWebTokenError)
      ? res.status(401).send({ message: 'invalid token'})
      : res.sendStatus(500);
  }
};

export {
  validateTurnBody,
  checkAuthorization,
};