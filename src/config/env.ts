import dotenv from 'dotenv';
dotenv.config();

interface ENV {
  API_PORT: number | undefined;
  AUTH_PORT: number | undefined;
  ACCESS_TOKEN_SECRET: string | undefined;
  REFRESH_TOKEN_SECRET: string | undefined;
}

interface Config {
  API_PORT: number;
  AUTH_PORT: number;
  ACCESS_TOKEN_SECRET: string;
  REFRESH_TOKEN_SECRET: string;
}

const getConfig = (): ENV => {
  return {
    API_PORT: process.env.API_PORT ? Number(process.env.API_PORT) : undefined,
    AUTH_PORT: process.env.AUTH_PORT ? Number(process.env.AUTH_PORT) : undefined,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  };
};

const getCleanConfig = (config: ENV): Config => {
  for(const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in .env file`);
    }
  }
  return config as Config;
};

const config = getConfig();
const cleanConfig = getCleanConfig(config);

export default cleanConfig;