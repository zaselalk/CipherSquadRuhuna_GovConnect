// src/services/ServiceFeedbackService.ts
import { serviceFeedbackRepository } from "../repositories/ServiceFeedbackRepository";
import { ServiceFeedback } from "../models/serviceFeedback";
import { ServiceFeedbackCreationAttributes } from "../models/serviceFeedback";

export class ServiceFeedbackService {
  /**
   * Add new feedback
   */
  async addFeedback(data: ServiceFeedbackCreationAttributes): Promise<ServiceFeedback> {
    // You can add validation here, e.g., rating between 1-5
    if (data.rating < 1 || data.rating > 5) {
      throw new Error("Rating must be between 1 and 5");
    }

    return await serviceFeedbackRepository.createFeedback(data);
  }

  /**
   * Get feedback by ID
   */
  async getFeedbackById(id: string): Promise<ServiceFeedback | null> {
    return await serviceFeedbackRepository.getFeedbackById(id);
  }

  /**
   * Get all feedbacks
   */
  async getAllFeedbacks(): Promise<ServiceFeedback[]> {
    return await serviceFeedbackRepository.getAllFeedbacks();
  }

  /**
   * Get all feedbacks by user
   */
  async getFeedbacksByUserId(userId: string): Promise<ServiceFeedback[]> {
    return await serviceFeedbackRepository.getFeedbacksByUserId(userId);
  }

  /**
   * Update feedback
   */
  async updateFeedback(
    id: string,
    data: Partial<ServiceFeedbackCreationAttributes>
  ): Promise<ServiceFeedback | null> {
    return await serviceFeedbackRepository.updateFeedback(id, data);
  }

  /**
   * Delete feedback
   */
  async deleteFeedback(id: string): Promise<boolean> {
    return await serviceFeedbackRepository.deleteFeedback(id);
  }
}

// Export an instance for easy use
export const serviceFeedbackService = new ServiceFeedbackService();
