declare namespace NodeJS {
  interface ProcessEnv {
    MONGO_URI: string;
    ACCESS_TOKEN_SECRET: string;
    REFRESH_TOKEN_SECRET: string;
    ACCESS_TOKEN_EXPIRES: string;
    REFRESH_TOKEN_EXPIRES: string;
    CLIENT_URL: string;
    PORT: string;
    NODE_ENV: string;
  }
}
