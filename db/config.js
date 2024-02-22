import dotenv from "dotenv";
import assert from "assert";

dotenv.config();

const {
  PORT,
  HOST,
  SQL_SERVER,
  SQL_USER,
  SQL_DB,
  SQL_PWD,
  HOST_URL,
  JWT_SECRET,
} = process.env;

assert(PORT, "PORT is reqiured");
assert(HOST, "HOST is reqiured");

const sqlEncrypt = process.env.SQL_ENCRYPT === "true";

const config = {
  port: PORT,
  host: HOST,
  url: HOST_URL,
  sql: {
    server: SQL_SERVER,
    user: SQL_USER,
    database: SQL_DB,
    password: SQL_PWD,
    options: {
      encrypt: sqlEncrypt,
      enableArithAbort: true,
    },
  },
  jwt_secret: JWT_SECRET,
};
export default config;
