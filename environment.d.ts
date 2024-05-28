declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_PORT: number;
      AUTH_PORT: number;
      ACCESS_TOKEN_SECRET: string;
      REFRESH_TOKEN_SECRET: string;
    }
  }
}

export {};