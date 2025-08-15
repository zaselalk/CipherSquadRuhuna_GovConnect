import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "./sequelize";
import { Citizen } from "./citizen";

// Define the attributes for the Feedback model
export interface FeedbackAttributes {
  id: number;
  citizenId: number;
  rating: number;
  comment?: string;
  createdAt: Date;
  updatedAt: Date;
}

// When creating a Feedback, `id`, `createdAt`, and `updatedAt` are optional
export interface FeedbackCreationAttributes
  extends Optional<FeedbackAttributes, "id" | "createdAt" | "updatedAt"> {}

/**
 * Feedback model
 * Stores ratings and comments from citizens
 */
export class Feedback
  extends Model<FeedbackAttributes, FeedbackCreationAttributes>
  implements FeedbackAttributes
{
  public id!: number;
  public citizenId!: number;
  public rating!: number;
  public comment?: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

/**
 * Initialize the Feedback model
 */
Feedback.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    citizenId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "citizens", // Must match table name
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE"
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    tableName: "feedbacks",
    timestamps: true
  }
);

// Relationships
Citizen.hasMany(Feedback, { foreignKey: "citizenId", as: "feedbacks" });
Feedback.belongsTo(Citizen, { foreignKey: "citizenId", as: "citizen" });
