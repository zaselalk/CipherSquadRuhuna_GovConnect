// src/repositories/feedback.repository.ts

import { Feedback, FeedbackAttributes, FeedbackCreationAttributes } from "../models/general-feedback";
import { Citizen } from "../models/citizen";
import { Op } from "sequelize";

export class FeedbackRepository {
  /**
   * Create new feedback entry
   */
  async createFeedback(data: FeedbackCreationAttributes): Promise<Feedback> {
    return await Feedback.create(data);
  }

  /**
   * Get all feedback entries
   */
  async getAllFeedback(): Promise<Feedback[]> {
    return await Feedback.findAll({
      include: [{ model: Citizen, as: "citizen" }],
      order: [["createdAt", "DESC"]]
    });
  }

  /**
   * Get feedback by ID
   */
  async getFeedbackById(id: number): Promise<Feedback | null> {
    return await Feedback.findByPk(id, {
      include: [{ model: Citizen, as: "citizen" }]
    });
  }

  /**
   * Get all feedback for a specific citizen
   */
  async getFeedbackByCitizen(citizenId: number): Promise<Feedback[]> {
    return await Feedback.findAll({
      where: { citizenId },
      include: [{ model: Citizen, as: "citizen" }],
      order: [["createdAt", "DESC"]]
    });
  }

  /**
   * Update feedback by ID
   */
  async updateFeedback(id: number, updates: Partial<FeedbackAttributes>): Promise<[number, Feedback[]]> {
    return await Feedback.update(updates, {
      where: { id },
      returning: true
    });
  }

  /**
   * Delete feedback by ID
   */
  async deleteFeedback(id: number): Promise<number> {
    return await Feedback.destroy({
      where: { id }
    });
  }

  /**
   * Search feedback by comment text
   */
  async searchFeedback(keyword: string): Promise<Feedback[]> {
    return await Feedback.findAll({
      where: {
        comment: { [Op.like]: `%${keyword}%` }
      },
      include: [{ model: Citizen, as: "citizen" }]
    });
  }
}

// Singleton instance
export const feedbackRepository = new FeedbackRepository();
