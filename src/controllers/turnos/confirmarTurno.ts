import { RequestHandler } from 'express';
import turnService from '@services/turnos';
import { TurnBodyWithAuth, TurnStates } from 'types';
import { ConfirmarTurnoParams, ConfirmarTurnoResBody } from '@controllers/turnos/types';

const confirmarTurno: RequestHandler<
  ConfirmarTurnoParams,
  ConfirmarTurnoResBody,
  TurnBodyWithAuth,
  unknown
> = async (req, res) => {
  const user = req.body.user;
  const turnId = req.params.id;

  try {
    const result = await turnService.setConfirmBy(turnId, user.id) as number;

    if (result < 1)
      return res.status(401).send({ message: `Turno ya confirmado.`});

    const reqResult = {
      id: turnId,
      estado: TurnStates.Confirmado,
      confirmadoPor: user.id
    };
    return res.status(200).send(reqResult);
  } catch(err) {
    console.log(err);
    return res.status(500).send({ message: 'Hubo un error al confirmar el turno.' });
  }
};

export default confirmarTurno;