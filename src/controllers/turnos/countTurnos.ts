import { RequestHandler } from 'express';
import turnService from '@services/turnos';
import { getQueryParams } from '@utils/turnos';
import { CountTurnosResBody, TurnoSearchQuery } from '@controllers/turnos/types';

const countTurnos: RequestHandler<
  unknown,
  CountTurnosResBody,
  unknown,
  TurnoSearchQuery
> = async (req, res) => {
  const p = getQueryParams(req.query);

  try {
    const cantidad = await turnService.count(p.placeholders, p.values) as number;
    res.send({ cantidad });
  } catch(err) {
    console.log(err);
    res.status(500).send({ message: 'Hubo un error al obtener cantidad' });
  }
};

export default countTurnos;