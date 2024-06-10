import { RequestHandler } from 'express';
import turnService from '@services/turnos';
import { getQueryParams } from '@utils/turnos';
import { QUERY_LIMIT } from '@constants/limits';
import { TurnBodyWithAuth, TurnRecord } from 'types';
import { GetTurnosResBody } from '@controllers/turnos/types';

const getTurnos: RequestHandler<
  unknown,
  GetTurnosResBody,
  TurnBodyWithAuth,
  object
> = async (req, res) => {
  const userId = req.body.user.id;
  const p = getQueryParams(req.query, userId);

  try {
    const cantidad = await turnService.count(p.placeholders, p.values) as number;
    const pages: number = Math.floor(cantidad/QUERY_LIMIT) + (cantidad%QUERY_LIMIT > 0 ? 1 : 0);
    
    const turnos = await turnService.getAll(p.placeholders, p.values) as TurnRecord[];
    
    res.status(200).send({
      cantidad,
      pages,
      offset: 0,
      page: 1,
      turnos
    });
  } catch(err) {
    console.log(err);
    res.status(500).send({ message: 'Hubo un error al obtener los turnos' });
  }
};

export default getTurnos;