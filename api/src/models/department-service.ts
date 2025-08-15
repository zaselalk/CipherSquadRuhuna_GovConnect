import { Model, DataTypes } from "sequelize";
import sequelize from "./sequelize";
import { Department } from "./department";


export class DepartmentService extends Model {
  public service_id!: number;
  public dep_id!: number;
  public name!: string;
  public description!: string | null;
  public createdAt!: Date;
  public updatedAt!: Date;
  public deletedAt!: Date | null;
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
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    sequelize,
    tableName: "department_services",
    timestamps: true,
    paranoid: true,
  }
);

// Association
Department.hasMany(DepartmentService, {
  foreignKey: "dep_id",
  as: "services",
});
DepartmentService.belongsTo(Department, {
  foreignKey: "dep_id",
  as: "department",
});
