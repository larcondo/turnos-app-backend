import { JwtPayload } from 'jsonwebtoken';

export interface UserRecord {
  id: string;
  email: string;
  nombre: string;
  password: string;
  rol?: string;
}

export enum UserRoles {
  Admin = 'admin',
  Client = 'client',
}

export interface TurnBasic {
  cancha: string;
  estado: string;
  fecha: string;
  inicio: string;
  fin: string;
}

export interface TurnRecord extends TurnBasic {
  id: string;
  solicitadoPor: string | null;
  confirmadoPor: string | null;
}

export type TurnBody = Omit<TurnRecord, 'id'>;
export interface TurnBodyWithAuth extends TurnBody {
  user: TokenPayload
}

export type UserBody = Omit<UserRecord, 'id'|'password'>;

export interface RegisterUserBody {
  email: string;
  password: string;
  nombre: string;
}

export interface AuthBodyBasic {
  token: string;
}

export interface QueryParams {
  placeholders: string;
  values: string[];
}

export interface TokenPayload {
  id: string;
  email: string;
}

export interface TokenCookie {
  refreshToken: string;
}

export interface DecodedPayload extends JwtPayload {
  id: string;
  email: string;
}

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

export interface DemoTurnosRequestBody {
  fecha: string;
  cancha: string;
}