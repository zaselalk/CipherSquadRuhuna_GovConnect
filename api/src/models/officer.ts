import { Model, DataTypes } from "sequelize";
import sequelize from "./sequelize";

export class Officer extends Model {
  id!: number;
  dep_id!: number;
  officer_id!: number;
  createdAt!: Date;
  updatedAt!: Date;
}

Officer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    dep_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    officer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
        references: {
            model: "users", // Assuming the users table is where officers are stored
            key: "id",
        },
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
  },
  {
    sequelize,
    modelName: "Officer",
    tableName: "officers",
    timestamps: true,
  }
);

