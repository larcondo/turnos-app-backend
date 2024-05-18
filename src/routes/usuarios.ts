import express from 'express';
import crypto from 'crypto';
import { UserBody, UserRecord } from '../types';
import userService from '../services/usuarios';

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const users = await userService.getAll();
    res.status(200).send(users);
  } catch(err) {
    console.log(err);
    res.status(500).send({ message: 'Hubo un error al obtener los usuarios' });
  }
});

router.post('/', async (req, res) => {
  const { email, nombre } = req.body as UserBody;

  if (!email || !nombre) {
    res.status(400).send({ message: 'Email y nombre son requeridos' });
    return;
  }

  const id = crypto.randomUUID();
  const newUser: UserRecord = { id, email, nombre };

  try {
    const created = await userService.insertOne(newUser);
    res.status(201).send(created);
  } catch(err) {
    console.log(err);
    if (err instanceof Error && err.message.includes('SQLITE_CONSTRAINT')) {
      res.status(400).send({ message: `Un usuario con el email ${email} ya existe.` });
    } else {
      res.status(500).send({ message: 'Hubo un error al crear el usuario' });
    }
  }
});

export default router;