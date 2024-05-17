export const ALL_TURNS: string = 'SELECT * FROM turnos';

export const TURN_BY_ID: string = 'SELECT * FROM turnos WHERE id=?';

export const COUNT_TOTAL_TURNS: string = 'SELECT COUNT(*) AS cantidad FROM turnos';

export const COUNT_SPECIFIC_TURN: string = `
SELECT COUNT(*) AS cantidad
FROM turnos
WHERE cancha=? AND inicio=? AND fin=?;
`;

export const INSERT_ONE: string =
`INSERT INTO turnos
(id, cancha, estado, inicio, fin, updated_at)
VALUES
(?, ?, ?, ?, ?, CURRENT_TIMESTAMP);`;

export const DELETE_BY_ID: string = `DELETE FROM turnos WHERE id=?`;

export const UPDATE_BY_ID: string =
`UPDATE turnos
SET
cancha=?, estado=?, 
inicio=?, fin=?,
solicitado_por=?, confirmado_por=?,
updated_at=CURRENT_TIMESTAMP
WHERE id=?;`;