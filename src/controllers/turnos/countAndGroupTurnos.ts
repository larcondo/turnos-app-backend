import { RequestHandler } from 'express';
import turnService from '@services/turnos';

interface GroupReqQuery {
  group: string;
  fecha: string;
}

const countAndGroup: RequestHandler<
  unknown,
  unknown,
  unknown,
  GroupReqQuery
> = async (req, res) => {
  const query = req.query;

  const availableGroups: Array<string> = ['cancha', 'fecha'];

  try {
    if(!('group' in query && typeof query.group === 'string')) {
      // Valor ausente o incorrecto
      return res.sendStatus(400);
    }
    const { group, fecha } = query;

    if(!availableGroups.includes(group)) {
      // Valor incorrecto
      return res.sendStatus(400);
    }

    const cantidades = await turnService.countAndGroup(group, fecha);
    return res.status(200).send(cantidades);    
  } catch(err) {
    console.log(err);
    return res.status(500).send({ message: 'Hubo un error al contar y agrupar.' });
  }
};

export default countAndGroup;