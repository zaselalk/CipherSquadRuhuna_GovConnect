// src/controllers/feedback.controller.ts
import { Request, Response } from "express";
import { GeneralFeedbackService } from "../services/generalFeedbackService";

export class FeedbackController {
  /**
   * Create new feedback
   */
  async create(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body;
      const feedback = await GeneralFeedbackService.addFeedback(data);
      res.status(201).json({ success: true, data: feedback });
    } catch (error) {
      console.error("Error creating feedback:", error);
      res.status(500).json({ success: false, message: "Failed to create feedback" });
    }
  }

  /**
   * Get all feedback
   */
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const feedbackList = await GeneralFeedbackService.getAllFeedbacks();
      res.json({ success: true, data: feedbackList });
    } catch (error) {
      console.error("Error fetching feedback:", error);
      res.status(500).json({ success: false, message: "Failed to retrieve feedback" });
    }
  }

  /**
   * Get feedback by ID
   */
  async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const feedback = await GeneralFeedbackService.getFeedbackById(id);

      if (!feedback) {
        res.status(404).json({ success: false, message: "Feedback not found" });
        return;
      }

      res.json({ success: true, data: feedback });
    } catch (error) {
      console.error("Error fetching feedback by ID:", error);
      res.status(500).json({ success: false, message: "Failed to retrieve feedback" });
    }
  }

  /**
   * Get feedback by citizen
   */
  async getByCitizen(req: Request, res: Response): Promise<void> {
    try {
      const citizenId = Number(req.params.citizenId);
      const feedbackList = await GeneralFeedbackService.getFeedbackByCitizen(citizenId);
      res.json({ success: true, data: feedbackList });
    } catch (error) {
      console.error("Error fetching feedback by citizen:", error);
      res.status(500).json({ success: false, message: "Failed to retrieve feedback" });
    }
  }

  /**
   * Update feedback
   */
  async update(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const updates = req.body;
      const updatedFeedback = await GeneralFeedbackService.updateFeedback(id, updates);

      if (!updatedFeedback) {
        res.status(404).json({ success: false, message: "Feedback not found" });
        return;
      }

      res.json({ success: true, data: updatedFeedback });
    } catch (error) {
      console.error("Error updating feedback:", error);
      res.status(500).json({ success: false, message: "Failed to update feedback" });
    }
  }

  /**
   * Delete feedback
   */
  async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const deleted = await GeneralFeedbackService.deleteFeedback(id);

      if (!deleted) {
        res.status(404).json({ success: false, message: "Feedback not found" });
        return;
      }

      res.json({ success: true, message: "Feedback deleted successfully" });
    } catch (error) {
      console.error("Error deleting feedback:", error);
      res.status(500).json({ success: false, message: "Failed to delete feedback" });
    }
  }

  /**
   * Search feedback
   */
  async search(req: Request, res: Response): Promise<void> {
    try {
      const keyword = req.query.keyword as string;
      const results = await GeneralFeedbackService.searchFeedback(keyword);
      res.json({ success: true, data: results });
    } catch (error) {
      console.error("Error searching feedback:", error);
      res.status(500).json({ success: false, message: "Failed to search feedback" });
    }
  }
}

export const feedbackController = new FeedbackController();
