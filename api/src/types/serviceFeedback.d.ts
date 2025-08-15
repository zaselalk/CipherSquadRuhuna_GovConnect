// src/types/serviceFeedback.ts
export type FeedbackType = "positive" | "neutral" | "negative";

export interface ServiceFeedback {
  id: string;
  appointmentId: string;
  serviceName: string;
  userId: string;
  rating: number;
  comment?: string;
  type: FeedbackType;
  createdAt: Date;       // Change from string → Date
  updatedAt?: Date;      // Change from string → Date
}
