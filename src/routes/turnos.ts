import express from 'express';
import { validateTurnBody, checkAuthorization } from '../middlewares/turnos';

// controllers
import getTurnos from '../controllers/getTurnos';
import getTurnoById from '../controllers/getTurnoById';
import countTurnos from '../controllers/countTurnos';
import createTurno from '../controllers/createTurno';
import updateTurno from '../controllers/updateTurno';
import deleteTurno from '../controllers/deleteTurno';
import solicitarTurno from '../controllers/solicitarTurno';
import confirmarTurno from '../controllers/confirmarTurno';

const router = express.Router();

router.get('/', checkAuthorization, getTurnos); // all or specific

router.get('/count',checkAuthorization, countTurnos);

router.get('/:id', checkAuthorization, getTurnoById); // get specific by id

router.put('/:id', checkAuthorization, updateTurno);  // update turn

router.post('/', checkAuthorization, validateTurnBody, createTurno);  // create new turn

router.delete('/:id', checkAuthorization, deleteTurno); // delete

router.post('/solicitar/:id', checkAuthorization, solicitarTurno);

router.post('/confirmar/:id', checkAuthorization, confirmarTurno);

export default router;