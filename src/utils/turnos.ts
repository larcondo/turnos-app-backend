import { CanchasDisponibles, QueryParams } from '../types';

const isValidCancha = (value: string): boolean => {
  const result: boolean = Object.values(CanchasDisponibles).includes(value as CanchasDisponibles);
  return result;
};

const isValidDateTime = (value: string): boolean => {
  const expresion = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01]) (0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/;
  return expresion.test(value);
};

const isValidDate = (value: string): boolean => {
  const expresion = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;
  return expresion.test(value);
};

const isValidTime = (value: string): boolean => {
  const expresion = /^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/;
  return expresion.test(value);
};

const getQueryParams = (query: object, userId: string|null = null): QueryParams => {
  const fields: string[] = [];
  const values: string[] = [];

  if ('cancha' in query && typeof query.cancha === 'string') {
    fields.push('cancha=?');
    values.push(query.cancha);
  }

  if ('estado' in query && typeof query.estado === 'string') {
    fields.push('estado=?');
    values.push(query.estado);
  }

  if ('fecha' in query && typeof query.fecha === 'string') {
    fields.push('fecha=?');
    values.push(query.fecha);
  }

  if ('solicito' in query && typeof query.solicito === 'string') {
    fields.push('solicitado_por=?');
    values.push(query.solicito);
  }

  if ('confirmo' in query && typeof query.confirmo === 'string') {
    fields.push('confirmado_por=?');
    values.push(query.confirmo);
  }

  if ('client' in query && userId) {
    fields.push('solicitado_por=?');
    values.push(userId);
  }

  if ('manager' in query && userId) {
    fields.push('confirmado_por=?');
    values.push(userId);
  }

  const placeholders: string = fields.join(' AND ');  

  return { placeholders, values };
};

export {
  isValidCancha,
  isValidDateTime,
  isValidDate,
  isValidTime,
  getQueryParams,
};