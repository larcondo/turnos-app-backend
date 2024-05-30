import express from 'express';
import { validateTurnBody, checkAuthorization } from '../middlewares/turnos';

// controllers
import getTurnos from '@controllers/turnos/getTurnos';
import getTurnoById from '@controllers/turnos/getTurnoById';
import countTurnos from '@controllers/turnos/countTurnos';
import countAndGroup from '@controllers/turnos/countAndGroupTurnos';
import countYearMonthTurnos from '@controllers/turnos/countYearMonthTurnos';
import createTurno from '@controllers/turnos/createTurno';
import updateTurno from '@controllers/turnos/updateTurno';
import deleteTurno from '@controllers/turnos/deleteTurno';
import solicitarTurno from '@controllers/turnos/solicitarTurno';
import confirmarTurno from '@controllers/turnos/confirmarTurno';

const router = express.Router();

router.get('/', checkAuthorization, getTurnos); // all or specific

router.get('/count', checkAuthorization, countTurnos);

router.get('/count-and-group', checkAuthorization, countAndGroup);

router.get('/count/yearmonth', checkAuthorization, countYearMonthTurnos);

router.get('/:id', checkAuthorization, getTurnoById); // get specific by id

router.put('/:id', checkAuthorization, updateTurno);  // update turn

router.post('/', checkAuthorization, validateTurnBody, createTurno);  // create new turn

router.delete('/:id', checkAuthorization, deleteTurno); // delete

router.post('/solicitar/:id', checkAuthorization, solicitarTurno);

router.post('/confirmar/:id', checkAuthorization, confirmarTurno);


export default router;