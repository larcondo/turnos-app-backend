import express from 'express';
import userService from '@services/usuarios';
import { checkLoginBody, checkRegisterBody } from '@middlewares/usuarios';

import loginUsuario from '@controllers/loginUsuario';
import registerUsuario from '@controllers/registerUsuario';


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

router.post('/login', checkLoginBody, loginUsuario);
router.post('/register', checkRegisterBody, registerUsuario);

export default router;