export const CREATE_TURNOS_TABLE =
`CREATE TABLE IF NOT EXISTS turnos(
  id TEXT PRIMARY KEY NOT NULL,
  cancha TEXT,
  solicitado_por TEXT,
  confirmado_por TEXT,
  estado TEXT,
  fecha TEXT,
  inicio TEXT,
  fin TEXT,
  updated_at TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);`;

export const ALL_TURNS: string =
`SELECT id, cancha, estado, fecha, inicio, fin,
solicitado_por AS solicitadoPor, confirmado_por as confirmadoPor
FROM turnos
ORDER BY fecha ASC
LIMIT 20;`;

export const TURN_BY_ID: string = 'SELECT * FROM turnos WHERE id=?';

export const COUNT_TOTAL_TURNS: string = 'SELECT COUNT(*) AS cantidad FROM turnos';

export const COUNT_SPECIFIC_TURN: string = `
SELECT COUNT(*) AS cantidad
FROM turnos
WHERE cancha=? AND fecha=? AND inicio=? AND fin=?;
`;

export const INSERT_ONE: string =
`INSERT INTO turnos
(id, cancha, estado, fecha, inicio, fin, updated_at)
VALUES
(?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP);`;

export const DELETE_BY_ID: string = `DELETE FROM turnos WHERE id=?`;

export const UPDATE_BY_ID: string =
`UPDATE turnos
SET
cancha=?, estado=?, 
fecha=?, inicio=?, fin=?,
solicitado_por=?, confirmado_por=?,
updated_at=CURRENT_TIMESTAMP
WHERE id=?;`;