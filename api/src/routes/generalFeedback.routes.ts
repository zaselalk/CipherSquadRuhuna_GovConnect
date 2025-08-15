// src/routes/feedback.routes.ts

import { Router } from "express";
import catchAsync from "../util/catchAsync";
import { feedbackController } from "../controllers/GeneralFeedbackController";

const FeedbackRouter: Router = Router();

// Create new feedback
FeedbackRouter.post("/", catchAsync(feedbackController.create));

// Get all feedback
FeedbackRouter.get("/", catchAsync(feedbackController.getAll));

// Get feedback by ID
FeedbackRouter.get("/:id", catchAsync(feedbackController.getById));

// Get feedback by citizen
FeedbackRouter.get("/citizen/:citizenId", catchAsync(feedbackController.getByCitizen));

// Update feedback
FeedbackRouter.put("/:id", catchAsync(feedbackController.update));

// Delete feedback
FeedbackRouter.delete("/:id", catchAsync(feedbackController.delete));

// Search feedback
FeedbackRouter.get("/search/query", catchAsync(feedbackController.search));

export default FeedbackRouter;
