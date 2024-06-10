import { RequestHandler } from 'express';
import turnService from '@services/turnos';
import { TurnosSolicitadosReqQuery, TurnosSolicitadosResBody } from '@controllers/turnos/types';
import { TurnRecord } from 'types';

const getRequestedTurnos: RequestHandler<
  unknown,
  TurnosSolicitadosResBody,
  unknown,
  TurnosSolicitadosReqQuery
> = async (req, res) => {
  const { fecha } = req.query;

  if (!fecha) {
    return res.status(400).send({ message: 'Se requiere el parámetro fecha [YYYY-MM-DD]' });
  }

  try {
    const turnos = await turnService.getRequestedTurns(fecha) as TurnRecord[];
    return res.status(200).send(turnos);
  } catch(err) {
    console.log(err);
    return res.status(500).send({ message: 'Hubo un error al obtener los turnos solicitados' });
  }

};

export default getRequestedTurnos;