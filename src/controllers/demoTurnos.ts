import { RequestHandler } from 'express';
import demoService from '@services/demo';
import { generateTurnosDemo } from '@utils/demoData';
import { TurnRecord, DemoTurnosRequestBody } from 'types';

const demoTurnos: RequestHandler<
  unknown,
  unknown,
  DemoTurnosRequestBody,
  unknown
> = async (req, res) => {
  const { fecha, cancha } = req.body;

  try {
    const turnos = generateTurnosDemo(fecha, cancha) as TurnRecord[];

    const rows = await demoService.countRowsByDate(fecha, cancha) as number;

    if (rows > 0) {
      return res.status(401).send({ message: `Ya existen datos de la fecha ${fecha} para la ${cancha}` });
    }

    const result = await demoService.insertDemoTurns(turnos);

    return result
      ? res.status(200).send({ message: `Turnos demo para la ${cancha} el ${fecha} agregados correctamente.` })
      : res.status(200).send({ message: 'No se agregaron turnos demo.' });

  } catch(err) {
    if (err instanceof Error) {
      console.log(err.message);
      if (err.cause === 'invalidCancha') {
        return res.status(400).send({ message: err.message });
      }
    }
    return res.status(500).send({ message: 'Hubo un error al insertar demo turnos.' });
  }
};

export default demoTurnos;