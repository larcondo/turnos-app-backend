import { RequestHandler } from 'express';
import turnService from '@services/turnos';
import { DeleteTurnoParams, DeleteResBody } from '@controllers/turnos/types';

const deleteTurno: RequestHandler<
  DeleteTurnoParams,
  DeleteResBody,
  unknown,
  unknown
> = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await turnService.deleteOne(id) as number;

    result > 0
      ? res.sendStatus(204)
      : res.status(404).send({ message: `Turno id='${id}' no existe.` });

  } catch(err) {
    console.log(err);
    res.status(500).send({ message: 'Hubo un error al eliminar turno' });
  }
};

export default deleteTurno;