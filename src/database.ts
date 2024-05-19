import sqlite3 from 'sqlite3';
import path from 'path';

sqlite3.verbose();

const databasePath = path.join(__dirname, '..', 'databases');
const DATABASE = 'turnos.db';

const db = new sqlite3.Database(path.join(databasePath, DATABASE), (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log('Conectado a la database...');
  }
});

export default db;