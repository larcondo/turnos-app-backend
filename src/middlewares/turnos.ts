import {Request, Response, NextFunction} from 'express';
import { TurnBody} from '../types';
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

export {
  validateTurnBody,
};