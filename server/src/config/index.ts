import dotenv from "dotenv";
dotenv.config();

const getEnv = (key: keyof NodeJS.ProcessEnv): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`❌ Missing environment variable: ${key}`);
  }
  return value;
};

export default {
  MONGO_URI: getEnv("MONGO_URI"),
  ACCESS_TOKEN_SECRET: getEnv("ACCESS_TOKEN_SECRET"),
  REFRESH_TOKEN_SECRET: getEnv("REFRESH_TOKEN_SECRET"),
  ACCESS_TOKEN_EXPIRES: getEnv("ACCESS_TOKEN_EXPIRES"),
  REFRESH_TOKEN_EXPIRES: getEnv("REFRESH_TOKEN_EXPIRES"),
  CLIENT_URL: getEnv("CLIENT_URL"),
  PORT: Number(process.env.PORT) || 5000,
  NODE_ENV: getEnv("NODE_ENV")
};

