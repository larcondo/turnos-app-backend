export const CREATE_USUARIOS_TABLE =
`CREATE TABLE IF NOT EXISTS usuarios(
  id TEXT PRIMARY KEY NOT NULL,
  email TEXT NOT NULL UNIQUE,
  nombre TEXT NOT NULL
);`;

export const ALL_USERS: string = 'SELECT * FROM usuarios';

export const INSERT_ONE: string = 'INSERT INTO usuarios (id, email, nombre) VALUES (?,?,?)';