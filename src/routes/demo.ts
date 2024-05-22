import express from 'express';
import { TurnRecord } from '../types';
import demoService from '@services/demo';
import { generateTurnosDemo } from '@utils/demoData';

const router = express.Router();

interface DemoRequestBody {
  fecha: string;
  cancha: string;
}

router.post('/turnos', async (req, res) => {
  const { fecha, cancha } = req.body as DemoRequestBody;

  try {
    const turnos = generateTurnosDemo(fecha, cancha);

    const rows = await demoService.countRowsByDate(fecha, cancha);

    if (rows as number > 0) {
      return res.status(401).send({ message: `Ya existen datos de la fecha ${fecha} para la ${cancha}` });
    }

    const result = await demoService.insertDemoTurns(turnos as TurnRecord[]);
    return result
      ? res.status(200).send({ message: 'Demo turnos agregados correctamente.' })
      : res.status(200).send({ message: 'No se agregaron demo turnos' });
  } catch(err) {
    if (err instanceof Error) {
      console.log(err.message);
      if (err.cause === 'invalidCancha') {
        return res.status(400).send({ message: err.message });
      }
    }
    return res.status(500).send({ message: 'Hubo un error al insertar demo turnos.' });
  }
});

export default router;