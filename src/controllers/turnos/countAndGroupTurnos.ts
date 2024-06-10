import { RequestHandler } from 'express';
import turnService from '@services/turnos';
import { CountAndGroupResBody, CountAndGroupSearchQuery } from '@controllers/turnos/types';
import { CountGroup } from 'types';

const countAndGroup: RequestHandler<
  unknown,
  CountAndGroupResBody,
  unknown,
  CountAndGroupSearchQuery
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

    const cantidades = await turnService.countAndGroup(group, fecha) as CountGroup[];
    return res.status(200).send(cantidades);    
  } catch(err) {
    console.log(err);
    return res.status(500).send({ message: 'Hubo un error al contar y agrupar.' });
  }
};

export default countAndGroup;