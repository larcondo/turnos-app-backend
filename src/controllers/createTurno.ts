import { RequestHandler } from 'express';
import crypto from 'crypto';
import turnService from '../services/turnos';
import { TurnBody, TurnRecord, TurnStates } from '../types';

const createTurno: RequestHandler<
  unknown,
  unknown,
  TurnBody,
  unknown
> = async (req, res) => {
  const { cancha, fecha, inicio, fin } = req.body;
  const id = crypto.randomUUID();

  const newTurn: TurnRecord = {
    id,
    cancha,
    fecha,
    inicio,
    fin,
    estado: TurnStates.Disponible,
    solicitadoPor: null,
    confirmadoPor: null
  };

  try {
    const cantidad = await turnService.countTurns(cancha, fecha, inicio, fin) as number;
    
    if (cantidad > 0) return res.status(401).send({ message: `Un turno el ${fecha} de ${inicio} a ${fin} ya existe!` });

    const created = await turnService.insertOne(newTurn);

    return res.status(201).send(created);

  } catch(err) {
    return res.status(500).send({ message: 'Hubo un error al crear el turno' });
  }
};

export default createTurno;