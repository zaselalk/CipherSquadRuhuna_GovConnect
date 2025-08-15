// src/repositories/ServiceFeedbackRepository.ts
import { ServiceFeedback } from "../models/serviceFeedback";
import { ServiceFeedback as ServiceFeedbackType } from "../types/serviceFeedback";

export class ServiceFeedbackRepository {
  /**
   * Create a new service feedback
   */
  async createFeedback(data: Omit<ServiceFeedbackType, "id" | "createdAt" | "updatedAt">): Promise<ServiceFeedback> {
    const feedback = await ServiceFeedback.create(data);
    return feedback;
  }

  /**
   * Get a feedback by ID
   */
  async getFeedbackById(id: string): Promise<ServiceFeedback | null> {
    return await ServiceFeedback.findByPk(id);
  }

  /**
   * Get all feedbacks
   */
  async getAllFeedbacks(): Promise<ServiceFeedback[]> {
    return await ServiceFeedback.findAll();
  }

  /**
   * Get feedbacks by user ID
   */
  async getFeedbacksByUserId(userId: string): Promise<ServiceFeedback[]> {
    return await ServiceFeedback.findAll({ where: { userId } });
  }

  /**
   * Update a feedback
   */
  async updateFeedback(id: string, data: Partial<Omit<ServiceFeedbackType, "id" | "createdAt" | "updatedAt">>): Promise<ServiceFeedback | null> {
    const feedback = await ServiceFeedback.findByPk(id);
    if (!feedback) return null;
    return await feedback.update(data);
  }

  /**
   * Delete a feedback
   */
  async deleteFeedback(id: string): Promise<boolean> {
    const deletedCount = await ServiceFeedback.destroy({ where: { id } });
    return deletedCount > 0;
  }
}

// Export an instance for convenience
export const serviceFeedbackRepository = new ServiceFeedbackRepository();
