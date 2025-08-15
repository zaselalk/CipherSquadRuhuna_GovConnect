// src/models/ServiceFeedback.ts
import { Model, DataTypes } from "sequelize";
import sequelize from "./sequelize";
import { FeedbackType } from "../types/serviceFeedback";

export interface ServiceFeedbackAttributes {
  id: string;
  appointmentId: string;
  serviceName: string;
  userId: string;
  rating: number;
  comment?: string;
  type: FeedbackType;
  createdAt: Date;
  updatedAt: Date;
}

// Attributes required when creating a new record
export type ServiceFeedbackCreationAttributes = Omit<ServiceFeedbackAttributes, "id" | "createdAt" | "updatedAt">;

export class ServiceFeedback extends Model<ServiceFeedbackAttributes, ServiceFeedbackCreationAttributes>
  implements ServiceFeedbackAttributes
{
  declare id: string;
  declare appointmentId: string;
  declare serviceName: string;
  declare userId: string;
  declare rating: number;
  declare comment?: string;
  declare type: FeedbackType;
  declare createdAt: Date;
  declare updatedAt: Date;
}

ServiceFeedback.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    appointmentId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    serviceName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    type: {
      type: DataTypes.ENUM("positive", "neutral", "negative"),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "ServiceFeedbacks",
    sequelize,
  }
);
