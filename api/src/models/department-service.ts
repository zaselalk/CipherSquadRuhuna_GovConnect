// models/department-service.ts

import { Model, DataTypes } from "sequelize";
import sequelize from "./sequelize";
import { Department } from "./department";
import { DocumentType } from "./document-type";

export class DepartmentService extends Model {
  public service_id!: number;
  public dep_id!: number;
  public name!: string;
  public doc_id!: number[]; // Array of integers
  public description!: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date | null;
}

DepartmentService.init(
  {
    service_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    dep_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Department,
        key: "dep_id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    doc_id: {
      type: DataTypes.JSON, // Store array of integers
      defaultValue: [],
    },
  },
  {
    sequelize,
    tableName: "department_services",
    timestamps: true,
    paranoid: true,
  }
);

// Associations
Department.hasMany(DepartmentService, {
  foreignKey: "dep_id",
  as: "services",
});

DepartmentService.belongsTo(Department, {
  foreignKey: "dep_id",
  as: "department",
});

