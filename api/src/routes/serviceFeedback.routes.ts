// src/routes/serviceFeedbackRoutes.ts
import { Router } from "express";
import { serviceFeedbackController } from "../controllers/ServiceFeedbackController";

const serviceFeedbackRouter = Router();

// Create a new feedback
serviceFeedbackRouter.post(
  "/",
  serviceFeedbackController.createFeedback.bind(serviceFeedbackController)
);

// Get all feedbacks
serviceFeedbackRouter.get(
  "/",
  serviceFeedbackController.getAllFeedbacks.bind(serviceFeedbackController)
);

serviceFeedbackRouter.get(
  "/user/:userId",
  serviceFeedbackController.getFeedbacksByUserId.bind(serviceFeedbackController)
);

export default serviceFeedbackRouter;
