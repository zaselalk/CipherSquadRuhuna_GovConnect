import { Sequelize } from "sequelize-typescript";
import config from "../config/config";
import { Dialect } from "sequelize";

const env: string = process.env.NODE_ENV || "development";

interface DBConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: Dialect;
}

const dbConfig: DBConfig = config[env] as DBConfig;

const sequelize = new Sequelize({
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  host: dbConfig.host,
  dialect: dbConfig.dialect,
});

export default sequelize;
