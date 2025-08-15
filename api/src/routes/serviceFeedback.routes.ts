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

// Uncomment the routes below if you want these features

// serviceFeedbackRouter.get(
//   "/:id",
//   serviceFeedbackController.getFeedbackById.bind(serviceFeedbackController)
// );

serviceFeedbackRouter.get(
  "/user/:userId",
  serviceFeedbackController.getFeedbacksByUserId.bind(serviceFeedbackController)
);

// serviceFeedbackRouter.put(
//   "/:id",
//   serviceFeedbackController.updateFeedback.bind(serviceFeedbackController)
// );

// serviceFeedbackRouter.delete(
//   "/:id",
//   serviceFeedbackController.deleteFeedback.bind(serviceFeedbackController)
// );
// */

export default serviceFeedbackRouter;
