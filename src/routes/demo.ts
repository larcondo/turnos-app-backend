import express from 'express';
import demoTurnos from '@controllers/demo/demoTurnos';
import { checkAuthorization } from '@middlewares/turnos';
import { checkIsAdmin } from '@middlewares/usuarios';

const router = express.Router();

router.post('/turnos', checkAuthorization, checkIsAdmin, demoTurnos);

export default router;