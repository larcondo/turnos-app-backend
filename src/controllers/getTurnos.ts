import { RequestHandler } from 'express';
import turnService from '@services/turnos';
import { getQueryParams } from '@utils/turnos';
import { QUERY_LIMIT } from '@constants/limits';

const getTurnos: RequestHandler<
  unknown,
  unknown,
  unknown,
  object
> = async (req, res) => {
  const p = getQueryParams(req.query);

  try {
    const cantidad = await turnService.count(p.placeholders, p.values) as number;
    const pages: number = Math.floor(cantidad/QUERY_LIMIT) + (cantidad%QUERY_LIMIT > 0 ? 1 : 0);
    
    const turnos = await turnService.getAll(p.placeholders, p.values);
    
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