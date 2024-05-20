import db from '../database';
import { INSERT_ONE } from '../queries/turnos';
import { TurnRecord } from '../types';

interface QueryResult {
  cantidad: number;
}

const countRowsByDate = (fecha: string, cancha: string): Promise<number|Error> => {
  const QUERY: string = 'SELECT COUNT(*) as cantidad FROM turnos WHERE fecha=? AND cancha=?;';

  return new Promise<number|Error>((resolve, reject) => {
    db.get<QueryResult>(QUERY, [fecha, cancha], function(err, row) {
      err
        ? reject(err)
        : resolve(row.cantidad);
    });
  });
};

const insertDemoTurns = (turns: TurnRecord[]): Promise<boolean|Error> => {
  return new Promise<boolean|Error>((resolve, reject) => {
    const stmt = db.prepare(INSERT_ONE);
    let i;
    for(i = 0; i < turns.length; i++) {
      stmt.run([
        turns[i].id, turns[i].cancha, turns[i].estado,
        turns[i].fecha, turns[i].inicio, turns[i].fin,
      ], function(err) {
        if (err) reject(err);
      });
    }
    stmt.finalize(function(err) {
      err
        ? reject(err)
        : resolve(true);
        // : resolve({ message: 'Turnos demo añadidos.' });
    });
  });
};

export default {
  countRowsByDate,
  insertDemoTurns
};