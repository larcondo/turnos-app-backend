import { RequestHandler } from 'express';
import turnService from '@services/turnos';
import { TurnStates, TurnosQuantity } from 'types';
import { CountYearMonthResBody, CountYearMonthSearhQuery } from '@controllers/turnos/types';

const countYearMonthTurnos: RequestHandler<
  unknown,
  CountYearMonthResBody,
  unknown,
  CountYearMonthSearhQuery
> = async (req, res) => {
  const query = req.query;
  const params = [];
  if ('prefix' in query && typeof query.prefix === 'string') {
    params.push(query.prefix + "%");
  } else {
    res.sendStatus(400);
  }

  if ('estado' in query && typeof query.estado === 'string') {
    params.push(query.estado);
  } else {
    params.push(TurnStates.Disponible.valueOf());
  }

  try {
    const turnosCantidad = await turnService.countYearMonth(params[0], params[1]) as TurnosQuantity[];
    res.send(turnosCantidad);
  } catch(err) {
    console.log(err);
    res.status(500).send({ message: 'Hubo un error al obtener cantidad' });
  }
};

export default countYearMonthTurnos;