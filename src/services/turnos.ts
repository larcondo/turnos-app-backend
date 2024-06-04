import db from '../database';
import { ALL_TURNS, TURN_BY_ID, COUNT_TOTAL_TURNS, INSERT_ONE,
  DELETE_BY_ID, UPDATE_BY_ID, COUNT_SPECIFIC_TURN, TURNS_REQUESTED_BY_DATE
} from '@queries/turnos';
import { TurnRecord, TurnStates } from '../types';

type CountType = {
  cantidad: number;
};

type CountGroup = {
  cantidad: number;
  cancha?: string;
  fecha?: string;
};

const getAll = (placeholders: string, values: string[]): Promise<TurnRecord[] | Error> => {
  const NEW_QUERY: string = `SELECT id, cancha, estado, fecha, inicio, fin,
  solicitado_por AS solicitadoPor, confirmado_por as confirmadoPor
  FROM turnos
  WHERE ${placeholders}
  ORDER BY fecha ASC, inicio ASC
  LIMIT 20;`;

  const QUERY: string = values.length > 0 ? NEW_QUERY : ALL_TURNS;

  return new Promise<TurnRecord[] | Error> ((resolve, reject) => {
    db.all<TurnRecord>(QUERY, values, (err, rows) => {
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

const getRequestedTurns = (fecha: string): Promise<TurnRecord[] | Error> => {
  return new Promise<TurnRecord[] | Error>((resolve, reject) => {
    db.all<TurnRecord>(TURNS_REQUESTED_BY_DATE, [TurnStates.Solicitado, fecha], (err, rows) => {
      err
        ? reject(err)
        : resolve(rows);
    });
  });
};

const insertOne = (turn: TurnRecord): Promise<TurnRecord|Error> => {
  const params: Array<string> = [
    turn.id,
    turn.cancha,
    turn.estado,
    turn.fecha,
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

const count = (placeholders: string, values: string[]):Promise<number|Error> => {
  const NEW_QUERY: string = `SELECT COUNT(*) AS cantidad FROM turnos WHERE ${placeholders};`;

  const QUERY: string = values.length > 0 ? NEW_QUERY : COUNT_TOTAL_TURNS;

  return new Promise<number|Error>((resolve, reject) => {
    db.get<CountType>(QUERY, values, (err, row) => {
      err
        ? reject(err)
        : resolve(row.cantidad);
    });
  });
};

const countAndGroup = (strGroup: string, strDate: string | undefined =  undefined): Promise<CountGroup[] | Error> => {
  const QUERY: string = strDate
  ? `SELECT ${strGroup}, COUNT(*) AS cantidad FROM turnos WHERE fecha="${strDate}" AND estado="disponible" GROUP BY ${strGroup};`
  : `SELECT ${strGroup}, COUNT(*) AS cantidad FROM turnos GROUP BY ${strGroup};`;

  return new Promise<CountGroup[] | Error>((resolve, reject) => {
    db.all<CountGroup>(QUERY, (err, rows) => {
      err
        ? reject(err)
        : resolve(rows);
    });
  });
};

const countTurns = (c: string, d: string, i: string, f: string):Promise<number|Error> => {
  return new Promise<number|Error>((resolve, reject) => {
    db.get<CountType>(COUNT_SPECIFIC_TURN, [c, d, i, f], (err, row) => {
      err
        ? reject(err)
        : resolve(row.cantidad);
    });
  });
};

const countYearMonth = (yearmonth: string, estado: string): Promise<CountType[]|Error> => {
  const QUERY: string = `SELECT COUNT(*) as cantidad, fecha FROM turnos
  WHERE fecha LIKE ? AND estado=?
  GROUP BY fecha;`;
  return new Promise<CountType[]|Error>((resolve, reject) => {
    db.all<CountType>(QUERY, [yearmonth, estado], (err, rows) => {
      err
        ? reject(err)
        : resolve(rows);
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
    turn.fecha, turn.inicio, turn.fin,
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

const setRequestedBy = (tid: string, uid: string): Promise<number|Error> => {
  const QUERY: string = 'UPDATE turnos SET solicitado_por=?, estado=?, updated_at=CURRENT_TIMESTAMP WHERE id=? AND solicitado_por IS NULL';
  const params: Array<string> = [uid, TurnStates.Solicitado, tid];

  return new Promise<number|Error>((resolve, reject) => {
    db.run(QUERY, params, function(err) {
      err
        ? reject(err)
        : resolve(this.changes);
    });
  });
};

const setConfirmBy = (tid: string, uid: string): Promise<number|Error> => {
  const QUERY: string = 'UPDATE turnos SET confirmado_por=?, estado=?, updated_at=CURRENT_TIMESTAMP WHERE id=? AND confirmado_por IS NULL';
  const params: Array<string> = [uid, TurnStates.Confirmado, tid];

  return new Promise<number|Error>((resolve, reject) => {
    db.run(QUERY, params, function(err) {
      err
        ? reject(err)
        : resolve(this.changes);
    });
  });
};

export default {
  getAll,
  getById,
  getRequestedTurns,
  insertOne,
  count,
  countAndGroup,
  countTurns,
  countYearMonth,
  updateOne,
  deleteOne,
  setRequestedBy,
  setConfirmBy,
};