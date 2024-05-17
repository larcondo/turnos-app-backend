import db from '../database';
import { UserRecord } from '../types';

const getAll = (): Promise<UserRecord[] | Error> => {
  const query: string = 'SELECT * FROM usuarios';

  return new Promise<UserRecord[] | Error> ((resolve, reject) => {
    db.all<UserRecord>(query, (err, rows) => {
      if (err) {
        console.log('mierror');
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

export {
  getAll,
};