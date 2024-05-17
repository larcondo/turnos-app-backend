import {Request, Response, NextFunction} from 'express';
import { TurnBody} from '../types';
import { isValidCancha, isValidDateTime } from '../utils/turnos';

const validateTurnBody = (req: Request, res:  Response, next: NextFunction) => {
  const body = req.body as TurnBody;

  // Todos los campos
  if ((!body.cancha) || (!body.inicio) || (!body.fin)) {
    return res.status(400).send({ message: 'Se requieren todos los campos [cancha, inicio, fin]' });
  }
  
  // Cancha valida
  if (!isValidCancha(body.cancha)) {
    return res.status(400).send({ message: 'La cancha no es válida' }); 
  }
  
  // Inicio y fin formatos validos
  if (!isValidDateTime(body.inicio)) {
    return res.status(400).send({
      received: body.inicio,
      message: 'inicio no es válido [YYYY-MM-DD HH:MM]'
    }); 
  }
  if (!isValidDateTime(body.fin)) {
    return res.status(400).send({
      received: body.fin,
      message: 'fin no es válido [YYYY-MM-DD HH:MM]'
    });
  }

  return next();
};

export {
  validateTurnBody,
};