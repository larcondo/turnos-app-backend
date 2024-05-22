import { RequestHandler } from 'express';
import turnService from '@services/turnos';
import { TurnBodyWithAuth, TurnRecord } from '../types';

const updateTurno: RequestHandler<
  { id: string },
  unknown,
  TurnBodyWithAuth,
  unknown
> = async (req, res) => {
  const id = req.params.id;
  const { user, ...resto} = req.body;
  const toUpdate: TurnRecord = { id, ...resto };
  
  try {
    const updated = await turnService.updateOne(toUpdate);
    res.status(200).send(updated);
  } catch(err) {
    console.log(err);
    res.status(500).send({ message: 'Hubo un error al actualizar turno' });
  }
};

export default updateTurno;