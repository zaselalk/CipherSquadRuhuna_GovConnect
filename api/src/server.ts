import express, { Application, Request, Response } from "express";
import { auditLogger } from "./middleware/auditLogger.middleware";
import dotenv from "dotenv";
import AuthRouter from "./routes/auth.routes";
import cors from "cors";
import UserRouter from "./routes/user.routes";
import serializeUser from "./middleware/serializeuser.middleware";
import expressErrorHandler from "./util/expressErrorHandler";
import CitizenRouter from "./routes/citizen.routes";
import DepartmentRouter from "./routes/department.routes";
import serviceFeedbackRouter from "./routes/serviceFeedback.routes";
import CitizenDocsRouter from "./routes/citizendoc.routes";
import OfficerRouter from "./routes/officer.route";
import path from "path";
import FeedbackRouter from "./routes/generalFeedback.routes";
import DepartmentServiceRouter from "./routes/DepService.routes";
import DocumentTypeRouter from "./routes/documenttype.routes";

dotenv.config();
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
app.use("/user", UserRouter);
app.use("/citizen", CitizenRouter);
app.use("/department", DepartmentRouter);
app.use("/service-feedback", serviceFeedbackRouter); // Assuming feedback routes are under department
app.use("/depservice", DepartmentServiceRouter);
app.use("/feedback", FeedbackRouter); // Assuming feedback routes are under department
app.use("/citizen-docs", CitizenDocsRouter);
app.use("/officer", OfficerRouter);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/feedback", FeedbackRouter); // Assuming feedback routes are under department
app.use("/document-types", DocumentTypeRouter);

// citizen routes

// error handling middleware
app.use(expressErrorHandler);

export default app;
