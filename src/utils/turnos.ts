import { CanchasDisponibles } from '../types';

const isValidCancha = (value: string): boolean => {
  const result: boolean = Object.values(CanchasDisponibles).includes(value as CanchasDisponibles);
  return result;
};

const isValidDateTime = (value: string): boolean => {
  const expresion = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01]) (0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/;
  return expresion.test(value);
};

export {
  isValidCancha,
  isValidDateTime,
};