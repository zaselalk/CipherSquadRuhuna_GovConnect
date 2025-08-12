import config from "../config/config";
import { Dialect } from "sequelize";
import { User } from "./user"; // Ensure this imports the model correctly
import Permission from "./permission";
import Role from "./role";
import sequelize from "./sequelize";

// Determine environment configuration
const env: string = process.env.NODE_ENV || "development";

interface DBConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: Dialect;
}

// Load DB config
const dbConfig: DBConfig = config[env] as DBConfig;

// Initialize Sequelize

Role.associate({ User, Permission });
User.associate({ Role });

// // Sync models with the database
// async function syncDatabase() {
//   try {
//     await sequelize.sync({ alter: true }); // Safe in development, removes need for migrations
//     console.log("Database connected and models synced successfully.");
//   } catch (error) {
//     console.error("Error syncing database:", error);
//   }
// }

// // Run the sync function
// syncDatabase();

export default sequelize;
export { User, Role, Permission };
