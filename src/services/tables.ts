import db from '../database';
import { CREATE_TURNOS_TABLE } from '@queries/turnos';
import { CREATE_USUARIOS_TABLE } from '@queries/usuarios';

const TABLE_EXISTS: string = 'SELECT name FROM sqlite_master WHERE type="table" AND name=?';

export interface CreateMessage {
  message: string;
}

const createUsuariosTable = () => {
  return new Promise<CreateMessage|Error>((resolve, reject) => {
    db.get(TABLE_EXISTS, 'usuarios', function(err, row) {
      if (err) {
        reject(err);
      } else {
        if (row) {
          resolve({ message: 'La tabla "usuarios" existe.' });
        } else {
          db.exec(CREATE_USUARIOS_TABLE, function(err) {
            err
              ? reject(err)
              : resolve({ message: 'Tabla "usuarios" creada.' });
          });
        }
      }
    });
  });
};


const createTurnosTable = (): Promise<CreateMessage|Error> => {
  return new Promise<CreateMessage|Error>((resolve, reject) => {
    db.get(TABLE_EXISTS, 'turnos', function(err, row) {
      if (err) {
        reject(err);
      } else {
        if (row) {
          resolve({ message: 'La tabla "turnos" existe.' });
        } else {
          db.exec(CREATE_TURNOS_TABLE, function(err) {
            err
              ? reject(err)
              : resolve({ message: 'Tabla "turnos" creada.' });
          });
        }
      }
    });
  });
};

export {
  createTurnosTable,
  createUsuariosTable,
};