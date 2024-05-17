import db from '../database';
import { ALL_TURNS, TURN_BY_ID, COUNT_TOTAL_TURNS, INSERT_ONE,
  DELETE_BY_ID, UPDATE_BY_ID, COUNT_SPECIFIC_TURN
} from '../queries/turnos';
import { TurnRecord } from '../types';

type CountType = {
  cantidad: number;
};

const getAll = (): Promise<TurnRecord[] | Error> => {
  return new Promise<TurnRecord[] | Error> ((resolve, reject) => {
    db.all<TurnRecord>(ALL_TURNS, (err, rows) => {
      err
        ? reject(err)
        : resolve(rows);
    });
  });
};

const getById = (id: string): Promise<TurnRecord|Error> => {
  return new Promise<TurnRecord|Error>((resolve, reject) => {
    db.get<TurnRecord>(TURN_BY_ID, id, function(err, row) {
      err
        ? reject(err)
        : resolve(row);
    });
  });
};

const insertOne = (turn: TurnRecord): Promise<TurnRecord|Error> => {
  const params: Array<string> = [
    turn.id,
    turn.cancha,
    turn.estado,
    turn.inicio,
    turn.fin
  ];

  return new Promise<TurnRecord|Error>((resolve, reject) => {
    db.run(INSERT_ONE, params, function(err) {
      err
        ? reject(err)
        : resolve(turn);
    });
  });
};

const count = ():Promise<number|Error> => {
  return new Promise<number|Error>((resolve, reject) => {
    db.get<CountType>(COUNT_TOTAL_TURNS, (err, row) => {
      err
        ? reject(err)
        : resolve(row.cantidad);
    });
  });
};

const countTurns = (c: string, i: string, f: string):Promise<number|Error> => {
  return new Promise<number|Error>((resolve, reject) => {
    db.get<CountType>(COUNT_SPECIFIC_TURN, [c, i, f], (err, row) => {
      err
        ? reject(err)
        : resolve(row.cantidad);
    });
  });
};

const deleteOne = (id: string): Promise<number|Error> => {
  return new Promise<number|Error>((resolve, reject) => {
    db.run(DELETE_BY_ID, id, function(err) {
      err
        ? reject(err)
        : resolve(this.changes);
    });
  });
};

const updateOne = (turn: TurnRecord): Promise<TurnRecord|Error> => {
  const params: Array<string|null> = [
    turn.cancha, turn.estado,
    turn.inicio, turn.fin,
    turn.solicitadoPor, turn.confirmadoPor,
    turn.id
  ];

  return new Promise<TurnRecord|Error>((resolve, reject) => {
    db.run(UPDATE_BY_ID, params, function(err) {
      err
        ? reject(err)
        : resolve(turn);
    });
  });
};

export default {
  getAll,
  getById,
  insertOne,
  count,
  countTurns,
  updateOne,
  deleteOne
};