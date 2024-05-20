import { RequestHandler } from 'express';
import turnService from '../services/turnos';
import { TurnBody, TurnRecord } from '../types';

const updateTurno: RequestHandler<
  { id: string },
  unknown,
  TurnBody,
  unknown
> = async (req, res) => {
  const id = req.params.id;
  const turn = req.body;
  const toUpdate: TurnRecord = { id, ...turn };

  try {
    const updated = await turnService.updateOne(toUpdate);
    res.status(200).send(updated);
  } catch(err) {
    console.log(err);
    res.status(500).send({ message: 'Hubo un error al actualizar turno' });
  }
};

export default updateTurno;