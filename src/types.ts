export interface UserRecord {
  id: string;
  email: string;
  nombre: string;
}

export interface TurnRecord {
  id: string;
  cancha: string;
  solicitadoPor: string | null;
  confirmadoPor: string | null;
  estado: string;
  inicio: string;
  fin: string; 
}

export type TurnBody = Omit<TurnRecord, 'id'>;

export type UserBody = Omit<UserRecord, 'id'>;

export enum TurnStates {
  Disponible = 'disponible',
  Solicitado = 'solicitado',
  Confirmado = 'confirmado',
  Cancelado = 'cancelado'
}

export enum CanchasDisponibles {
  Cancha1 = 'cancha 1',
  Cancha2 = 'cancha 2',
  Cancha3 = 'cancha 3',
  Cancha4 = 'cancha 4'
}