import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { RequestHandler } from 'express';
import userService from '@services/usuarios';
import { UserRecord } from 'types';
import { RegisterResBody, RegisterReqBody } from '@controllers/usuarios/types';

const registerUsuario: RequestHandler<
  unknown,
  RegisterResBody,
  RegisterReqBody,
  unknown
> = async (req, res) => {
  try {
    const { email, password, nombre } = req.body;
    const id = crypto.randomUUID();
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser: UserRecord = { id, email, nombre, password: hashedPassword };

    const created = await userService.insertOne(newUser) as UserRecord;

    res.status(201).send(created);
  } catch(err) {
    console.log(err);
    if (err instanceof Error && err.message.includes('SQLITE_CONSTRAINT')) {
      res.status(400).send({ message: `Un usuario con el email ${req.body.email} ya existe.` });
    } else {
      res.status(500).send({ message: 'Hubo un error al crear el usuario' });
    }
  }
};

export default registerUsuario;