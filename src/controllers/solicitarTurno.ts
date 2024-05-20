import { RequestHandler } from 'express';
import { AuthBodyBasic } from '../types';
import turnService from '../services/turnos';

const solicitarTurno: RequestHandler<
  { id: string },
  unknown,
  AuthBodyBasic,
  unknown
> = async (req, res) => {
  const userId = req.body.userId;
  const turnId = req.params.id;

  try {
    const result = await turnService.setRequestedBy({ userId, turnId });
    
    return (result as number > 0)
    ? res.status(200).send({ message: `Turno solicitado exitosamente.`})
    : res.status(401).send({ message: `Turno no disponible.`});

  } catch(err) {
    console.log(err);
    return res.status(500).send({ message: 'Hubo un error al solicitar el turno.' });
  }
};

export default solicitarTurno;