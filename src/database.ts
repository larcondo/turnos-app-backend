import sqlite3 from 'sqlite3';

sqlite3.verbose();

const db = new sqlite3.Database('./src/turnos.db', (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log('Conectado a la database...');
  }
});

export default db;