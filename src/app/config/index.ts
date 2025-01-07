import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export const config = {
  mongo_uri: process.env.MONGO_URI,
  port: process.env.PORT,
  node_env: process.env.NODE_ENV,
  frontend_host: process.env.FRONTEND_HOST,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  email_host: process.env.EMAIL_HOST,
  email_port: process.env.EMAIL_PORT,
  email_user: process.env.EMAIL_USER,
  email_pass: process.env.EMAIL_PASS,
  email_from: process.env.EMAIL_FROM,
};
