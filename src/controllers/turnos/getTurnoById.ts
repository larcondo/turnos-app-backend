import { RequestHandler } from 'express';
import turnService from '@services/turnos';
import { GetTurnoByIdResBody, GetTurnoByIdParams } from '@controllers/turnos/types';
import { TurnRecord } from 'types';

const getTurnoById: RequestHandler<
  GetTurnoByIdParams,
  GetTurnoByIdResBody,
  unknown,
  unknown
> = async (req, res) => {
  const id = req.params.id;

  try {
    const turn = await turnService.getById(id) as TurnRecord;
    turn === undefined
      ? res.status(404).send({ message: 'El turno no existe.' })
      : res.status(200).send(turn);
  } catch(err) {
    console.log(err);
    res.status(500).send({ message: 'Hubo un error al obtener el turno' });
  }
};

export default getTurnoById;