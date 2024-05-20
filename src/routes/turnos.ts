import express from 'express';
import crypto from 'crypto';
import { TurnBody, TurnRecord, TurnStates } from '../types';
import { validateTurnBody, checkAuthorization } from '../middlewares/turnos';
import turnService from '../services/turnos';
import { getQueryParams } from '../utils/turnos';

// controllers
import solicitarTurno from '../controllers/solicitarTurno';
import confirmarTurno from '../controllers/confirmarTurno';

const router = express.Router();

const QUERY_LIMIT: number = 20;

// all
router.get('/', async (req, res) => {
  const p = getQueryParams(req.query);

  try {
    const cantidad = await turnService.count(p.placeholders, p.values) as number;
    const pages: number = Math.floor(cantidad/QUERY_LIMIT) + (cantidad%QUERY_LIMIT > 0 ? 1 : 0);
    const turnos = await turnService.getAll(p.placeholders, p.values);
    res.status(200).send({
      cantidad,
      pages,
      offset: 0,
      page: 1,
      turnos
    });
  } catch(err) {
    console.log(err);
    res.status(500).send({ message: 'Hubo un error al obtener los turnos' });
  }
});

router.get('/count', async (req, res) => {
  const p = getQueryParams(req.query);

  try {
    const cantidad = await turnService.count(p.placeholders, p.values);
    res.send({ cantidad });
  } catch(err) {
    console.log(err);
    res.status(500).send({ message: 'Hubo un error al obtener cantidad' });
  }
});

// get specific
router.get('/:id', async (req, res) => {
  const id: string = req.params.id;

  try {
    const turn = await turnService.getById(id);
    turn === undefined
      ? res.status(404).send({ message: 'El turno no existe.' })
      : res.status(200).send(turn);
  } catch(err) {
    console.log(err);
    res.status(500).send({ message: 'Hubo un error al obtener el turno' });
  }
});

// update
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const turn = req.body as TurnBody;
  const toUpdate: TurnRecord = { id, ...turn };

  try {
    const updated = await turnService.updateOne(toUpdate);
    res.status(200).send(updated);
  } catch(err) {
    console.log(err);
    res.status(500).send({ message: 'Hubo un error al actualizar turno' });
  }
});

// add
router.post('/', validateTurnBody, async (req, res) => {
  // middleware validations
  const { cancha, fecha, inicio, fin } = req.body as TurnBody;
  const id = crypto.randomUUID();
  const newTurn: TurnRecord = {
    id,
    cancha,
    fecha,
    inicio,
    fin,
    estado: TurnStates.Disponible,
    solicitadoPor: null,
    confirmadoPor: null
  };

  try {
    const qty = await turnService.countTurns(cancha, inicio, fin);

    if (typeof qty === 'number' && qty > 0) return res.status(401).send({ message: 'El turno ya existe!' });

    const created = await turnService.insertOne(newTurn);

    return res.status(201).send(created);

  } catch(err) {
    return res.status(500).send({ message: 'Hubo un error al crear el turno' });
  }
});

// delete
router.delete('/:id', async (req, res) => {
  const id: string = req.params.id;

  try {
    const result = await turnService.deleteOne(id);

    typeof result === 'number' && result > 0
      ? res.sendStatus(204)
      : res.status(404).send({ message: `Turno id='${id}' no existe.` });

  } catch(err) {
    console.log(err);
    res.status(500).send({ message: 'Hubo un error al eliminar turno' });
  }
});

router.post('/solicitar/:id', checkAuthorization, solicitarTurno);

router.post('/confirmar/:id', checkAuthorization, confirmarTurno);

export default router;