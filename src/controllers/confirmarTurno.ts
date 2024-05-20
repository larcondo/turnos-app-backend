import { RequestHandler } from 'express';
import { AuthBodyBasic } from '../types';
import turnService from '../services/turnos';

const confirmarTurno: RequestHandler<
  { id: string},
  unknown,
  AuthBodyBasic,
  unknown
> = async (req, res) => {
  const userId = req.body.userId;
  const turnId = req.params.id;

  try {
    const result = await turnService.setConfirmBy(turnId, userId);

    return (result as number > 0)
    ? res.status(200).send({ message: `Turno confirmado exitosamente.`})
    : res.status(401).send({ message: `Turno ya confirmado.`});
  } catch(err) {
    console.log(err);
    return res.status(500).send({ message: 'Hubo un error al confirmar el turno.' });
  }
};

export default confirmarTurno;