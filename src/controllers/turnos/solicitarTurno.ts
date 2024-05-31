import { RequestHandler } from 'express';
import turnService from '@services/turnos';
import { TurnBodyWithAuth } from 'types';

const solicitarTurno: RequestHandler<
  { id: string },
  unknown,
  TurnBodyWithAuth,
  unknown
> = async (req, res) => {
  const user = req.body.user;
  const turnId = req.params.id;

  try {
    const result = await turnService.setRequestedBy(turnId, user.id) as number;

    if (result < 1) {
      return res.status(401).send({ message: `Turno no disponible.`});
    } else {
      const reqResult = {
        id: user.id,
        estado: 'solicitado',
        solicitadoPor: turnId
      };
      return res.status(200).send(reqResult);
    }
  } catch(err) {
    console.log(err);
    return res.status(500).send({ message: 'Hubo un error al solicitar el turno.' });
  }
};

export default solicitarTurno;