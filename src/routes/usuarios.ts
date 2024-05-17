import express from 'express';
import db from '../database';
import crypto from 'crypto';
import { UserBody } from '../types';
import { getAll } from '../services/usuarios';

const router = express.Router();

router.get('/', (_req, res) => {
  getAll()
  .then( rows => {
    return res.send(rows);
  })
  .catch((error) => {
    console.log(error);
    return res.status(500).send({ message: 'Hubo un error al obtener los usuarios' });
  });
});

router.post('/', (req, res) => {
  // const body = req.body as UserBody;
  const { email, nombre } = req.body as UserBody;

  if (!email || !nombre) {
    res.status(400).send({ message: 'Email y nombre son requeridos' });
    return;
  }

  const userId = crypto.randomUUID();

  const query: string = 'INSERT INTO usuarios (id, email, nombre) VALUES (?,?,?)';

  const params: Array<string> = [userId, email, nombre];

  try {
    const result = db.run(query, params);
    console.log(result);
    res.send({ message: 'Usuario creado.', user: { id: userId, email, nombre } });
  } catch(err) {
    res.status(500).send({ message: 'Hubo un error al crear el usuario' });
  }
});

export default router;