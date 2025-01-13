import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export const config = {
  mongo_uri: process.env.MONGO_URI,
  port: process.env.PORT,
  node_env: process.env.NODE_ENV,
  frontend_host: process.env.FRONTEND_HOST,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt_access_token_secret_key: process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
  jwt_refresh_token_secret_key: process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
  jwt_password_reset_token_secret_key:
    process.env.JWT_PASSWORD_RESET_TOKEN_SECRET_KEY,
  email_host: process.env.EMAIL_HOST,
  email_port: process.env.EMAIL_PORT,
  email_user: process.env.EMAIL_USER,
  email_pass: process.env.EMAIL_PASS,
  email_from: process.env.EMAIL_FROM,
};
