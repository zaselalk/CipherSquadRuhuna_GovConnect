import { SequelizeOptions } from "sequelize-typescript";

// required to load environment variables from .env file if development
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const config: { [key: string]: SequelizeOptions } = {
  development: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST || "localhost",
    dialect: "mysql",
  },
  test: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST || "localhost",
    dialect: "mysql",
  },
  production: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST || "localhost",
    dialect: "mysql",
  },
};

module.exports = config;
export default config;
