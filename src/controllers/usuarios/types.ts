import { UserRecord, BaseErrorMsg } from "types";

export interface LoginReqBody {
  email: string;
  password: string;
}

interface LoginReqError extends BaseErrorMsg {
  field: string;
}

type LoginSuccess = {
  accessToken: string;
  email: string;
  nombre: string;
  rol: string | undefined;
};

export type LoginResBody = LoginSuccess | LoginReqError | BaseErrorMsg;

export type LogoutResBody = BaseErrorMsg;

export type RefreshResBody = BaseErrorMsg | LoginSuccess;

export interface RegisterReqBody {
  email: string;
  password: string;
  nombre: string;
}

export type RegisterResBody = BaseErrorMsg | UserRecord;