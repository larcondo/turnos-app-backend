import { RequestHandler } from 'express';
import turnService from '@services/turnos';

interface ReqQuery {
  fecha: string;
}

const getRequestedTurnos: RequestHandler<
  unknown,
  unknown,
  unknown,
  ReqQuery
> = async (req, res) => {
  const q = req.query;
  const { fecha } = q;

  if (!fecha) {
    return res.status(400).send({ message: 'Se requiere el parámetro fecha [YYYY-MM-DD]' });
  }

  try {
    const turnos = await turnService.getRequestedTurns(fecha);
    return res.status(200).send(turnos);
  } catch(err) {
    console.log(err);
    return res.status(500).send({ message: 'Hubo un error al obtener los turnos solicitados' });
  }

};

export default getRequestedTurnos;