import { RequestHandler } from 'express';
import turnService from '@services/turnos';
import { TurnBodyWithAuth } from 'types';

const confirmarTurno: RequestHandler<
  { id: string},
  unknown,
  TurnBodyWithAuth,
  unknown
> = async (req, res) => {
  const user = req.body.user;
  const turnId = req.params.id;

  try {
    const result = await turnService.setConfirmBy(turnId, user.id);

    return (result as number > 0)
    ? res.status(200).send({ message: `Turno confirmado exitosamente.`})
    : res.status(401).send({ message: `Turno ya confirmado.`});
  } catch(err) {
    console.log(err);
    return res.status(500).send({ message: 'Hubo un error al confirmar el turno.' });
  }
};

export default confirmarTurno;