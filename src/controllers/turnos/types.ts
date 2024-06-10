import { BaseErrorMsg, TurnRecord, TurnosQuantity, CountGroup } from "types";

export interface TurnosPaginated {
  cantidad: number;
  offset: number;
  page: number;
  pages: number;
  turnos: TurnRecord[];
}

export type GetTurnosResBody = BaseErrorMsg | TurnosPaginated;

export interface GetTurnoByIdParams {
  id: string;
}

export type GetTurnoByIdResBody = BaseErrorMsg | TurnRecord;

export interface ConfirmarTurnoParams {
  id: string;
}

export interface TurnoConfirmado {
  id: string;
  estado: string;
  confirmadoPor: string;
}

export type ConfirmarTurnoResBody = BaseErrorMsg | TurnoConfirmado;

export interface SolicitarTurnoParams {
  id: string;
}

export interface TurnoSolicitado {
  id: string;
  estado: string;
  solicitadoPor: string;
}

export type SolicitarTurnoResBody = BaseErrorMsg | TurnoSolicitado;

export interface TurnosSolicitadosReqQuery {
  fecha: string;
}

export type TurnosSolicitadosResBody = BaseErrorMsg | TurnRecord[];

export type CountTurnosResBody = BaseErrorMsg | TurnosQuantity;

export interface TurnoSearchQuery {
  cancha?: string;
  estado?: string;
  fecha?: string;
  solicito?: string;
  confirmo?: string;
  client?: string | boolean | undefined;
  manager?: string | boolean | undefined;
}

export interface DeleteTurnoParams {
  id: string;
}

export type DeleteResBody = BaseErrorMsg;

export type CreateTurnoResBody = BaseErrorMsg | TurnRecord;

export interface UpdateTurnoParams {
  id: string;
}

export type UpdateTurnoResBody = BaseErrorMsg | TurnRecord;

export interface CountAndGroupSearchQuery {
  group: string;
  fecha: string;
}

export type CountAndGroupResBody = BaseErrorMsg | CountGroup[];

export type CountYearMonthResBody = BaseErrorMsg | TurnosQuantity[];

export interface CountYearMonthSearhQuery {
  prefix: string;
  estado?: string;
}