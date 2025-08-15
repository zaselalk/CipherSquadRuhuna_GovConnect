// src/services/generalFeedback.service.ts
import { feedbackRepository } from "../repositories/GeneralFeedbackRepository";
import { Feedback, FeedbackAttributes, FeedbackCreationAttributes } from "../models/general-feedback";

export class generalFeedbackService {
  /**
   * Add new feedback
   */
  async addFeedback(data: FeedbackCreationAttributes): Promise<Feedback> {
    return await feedbackRepository.createFeedback(data);
  }

  /**
   * Get all feedback
   */
  async getAllFeedbacks(): Promise<Feedback[]> {
    return await feedbackRepository.getAllFeedback();
  }

  /**
   * Get feedback by ID
   */
  async getFeedbackById(id: number): Promise<Feedback | null> {
    return await feedbackRepository.getFeedbackById(id);
  }

  /**
   * Get all feedback for a specific citizen
   */
  async getFeedbackByCitizen(citizenId: number): Promise<Feedback[]> {
    return await feedbackRepository.getFeedbackByCitizen(citizenId);
  }

  /**
   * Update feedback by ID
   */
  async updateFeedback(id: number, updates: Partial<FeedbackAttributes>): Promise<Feedback | null> {
    const [updatedCount, updatedRows] = await feedbackRepository.updateFeedback(id, updates);
    return updatedCount > 0 ? updatedRows[0] : null;
  }

  /**
   * Delete feedback by ID
   */
  async deleteFeedback(id: number): Promise<boolean> {
    const deletedCount = await feedbackRepository.deleteFeedback(id);
    return deletedCount > 0;
  }

  /**
   * Search feedback by comment keyword
   */
  async searchFeedback(keyword: string): Promise<Feedback[]> {
    return await feedbackRepository.searchFeedback(keyword);
  }
}

// Singleton instance
export const GeneralFeedbackService = new generalFeedbackService();
