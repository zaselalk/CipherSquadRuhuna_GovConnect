// src/controllers/ServiceFeedbackController.ts
import { Request, Response } from "express";
import { serviceFeedbackService } from "../services/ServiceFeedbackServices";

export class ServiceFeedbackController {
  /**
   * Create new feedback
   */
  async createFeedback(req: Request, res: Response) {
    try {
      const feedback = await serviceFeedbackService.addFeedback(req.body);
      res.status(201).json(feedback);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  /**
   * Get feedback by ID
   */
  async getFeedbackById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const feedback = await serviceFeedbackService.getFeedbackById(id);
      if (!feedback) {
        return res.status(404).json({ message: "Feedback not found" });
      }
      res.json(feedback);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  /**
   * Get all feedbacks
   */
  async getAllFeedbacks(req: Request, res: Response) {
    try {
      const feedbacks = await serviceFeedbackService.getAllFeedbacks();
      res.json(feedbacks);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  /**
   * Get feedbacks by user ID
   */
  async getFeedbacksByUserId(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const feedbacks = await serviceFeedbackService.getFeedbacksByUserId(userId);
      res.json(feedbacks);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  /**
   * Update feedback
   */
  async updateFeedback(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const feedback = await serviceFeedbackService.updateFeedback(id, req.body);
      if (!feedback) {
        return res.status(404).json({ message: "Feedback not found" });
      }
      res.json(feedback);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  /**
   * Delete feedback
   */
  async deleteFeedback(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deleted = await serviceFeedbackService.deleteFeedback(id);
      if (!deleted) {
        return res.status(404).json({ message: "Feedback not found" });
      }
      res.json({ message: "Feedback deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}

// Export an instance for routes
export const serviceFeedbackController = new ServiceFeedbackController();
