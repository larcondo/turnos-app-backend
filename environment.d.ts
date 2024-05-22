declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_PORT: string;
      AUTH_PORT: string;
      ACCESS_TOKEN_SECRET: string;
      REFRESH_TOKEN_SECRET: string;
    }
  }
}

export {};