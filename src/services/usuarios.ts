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

const insertOne = (user: UserRecord): Promise<UserRecord|Error> => {
  const params = [
    user.id,
    user.email,
    user.nombre
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
  insertOne,
};