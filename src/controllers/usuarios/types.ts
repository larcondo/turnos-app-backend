export type BaseErrorMsg = {
  message: string;
};

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
