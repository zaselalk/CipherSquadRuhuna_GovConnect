import { Model, DataTypes } from "sequelize";
import sequelize from "./index";

/**
 * AuditLog model represents an audit log entry in the database.
 * It stores information about actions performed by users, including
 * the user ID, action type, details of the action, and timestamps.
 */
class AuditLog extends Model {
  public id!: number;
  public userId!: number | null;
  public action!: string;
  public details!: Record<string, any> | null;
  public createdAt!: Date;
}

AuditLog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    details: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "AuditLog",
    tableName: "audit_logs",
    timestamps: false,
  }
);

export default AuditLog;
