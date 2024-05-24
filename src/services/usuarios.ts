import db from '../database';
import { UserRecord } from '../types';
import { ALL_USERS, INSERT_ONE } from '@queries/usuarios';

const getAll = (): Promise<UserRecord[] | Error> => {
  return new Promise<UserRecord[] | Error> ((resolve, reject) => {
    db.all<UserRecord>(ALL_USERS, (err, rows) => {
      if (err) {
        console.log('mierror');
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

const getById = (id: string): Promise<UserRecord|Error> => {
  const QUERY: string = 'SELECT id, nombre, email, rol FROM usuarios WHERE id=?';
  
  return new Promise<UserRecord|Error>((resolve, reject) => {
    db.get<UserRecord>(QUERY, [id], function(err, row) {
      err ? reject(err) : resolve(row);
    });
  });
};

const getByEmail = (email: string): Promise<UserRecord|Error> => {
  const QUERY: string = 'SELECT id, nombre, email, password FROM usuarios WHERE email=?;';

  return new Promise<UserRecord|Error>((resolve, reject) => {
    db.get<UserRecord>(QUERY, [email], function(err, row) {
      err ? reject(err) : resolve(row);
    });
  });
};

const insertOne = (user: UserRecord): Promise<UserRecord|Error> => {
  const params = [
    user.id,
    user.email,
    user.nombre,
    user.password,
  ];

  return new Promise<UserRecord|Error>((resolve, reject) => {
    db.run(INSERT_ONE, params, function(err) {
      err
        ? reject(err)
        : resolve(user);
    });
  });
};

export default {
  getAll,
  getById,
  getByEmail,
  insertOne,
};