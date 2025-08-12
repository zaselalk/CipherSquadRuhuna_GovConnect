import express, { Application, Request, Response } from "express";
import { auditLogger } from "./middleware/auditLogger.middleware";
import dotenv from "dotenv";
import AuthRouter from "./routes/auth.routes";
import sequelize from "./models";
import cors from "cors";
import RoleRouter from "./routes/role.routes";
import UserRouter from "./routes/user.routes";
import serializeUser from "./middleware/serializeuser.middleware";
import expressErrorHandler from "./util/expressErrorHandler";
import "./models/association"; // Import associations to ensure they are registered

dotenv.config();

// env variables
const PORT: number =
  parseInt(process.env.APPLICATION_PORT as string, 10) || 3001;
const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Middleware to serialize user data
// This middleware will be used to serialize user data before sending it in the response
app.use(serializeUser);

// Middleware to log actions
app.use(auditLogger);

// home route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "API server is running..." });
});

// health check route
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ message: "Server is healthy.. 😊" });
});

// Registering routes
app.use("/auth", AuthRouter);
app.use("/role", RoleRouter);
app.use("/user", UserRouter);

// citizen routes
// app.use("/resident", ResidentRouter);

// error handling middleware
app.use(expressErrorHandler);

app.listen(PORT, async () => {
  sequelize.sync();
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
