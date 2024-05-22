import bcrypt from 'bcrypt';
import { RequestHandler } from 'express';
import demoService from '@services/demo';
import { generateUsuariosDemo } from '@utils/demoData';

const demoUsuarios: RequestHandler<unknown, unknown, unknown, unknown> = async (_req, res) => {
  const fakeUsers = generateUsuariosDemo();
  const emails = fakeUsers.map(u => u.email);
  console.log('emails:', emails);
  try {
    const cantidad = await demoService.countDemoUsers(emails) as number;
    if (cantidad > 0) throw new Error('SQLITE_CONSTRAINT');

    const usuarios = await Promise.all(
      fakeUsers.map(async (u) => {
        return { ...u, password: await bcrypt.hash(u.password, 10) };
      })
    );
    
    const result = await demoService.insertDemoUsers(usuarios);
    console.log(JSON.stringify(fakeUsers));

    result
      ? res.status(200).send({ message: 'Demo usuarios agregados correctamente.', usuarios })
      : res.status(200).send({ message: 'No se agregaron demo usuarios' });

  } catch(err) {
    if (err instanceof Error && err.message.includes('SQLITE_CONSTRAINT')) {
      console.log(err.message);
      res.status(400).send({ message: `Todos o algunos usuarios demo ya existen.` });
    } else {
      console.log(err);
      res.status(500).send({ message: 'Hubo un error al agregar usuarios demo.' });
    }
  }
};

export default demoUsuarios;