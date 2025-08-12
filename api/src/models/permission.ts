"use strict";

import { Model, DataTypes, Sequelize } from "sequelize";
import sequelize from "./sequelize";

interface PermissionAttributes {
  id: number;
  permission: string;
}

export class Permission
  extends Model<PermissionAttributes>
  implements PermissionAttributes
{
  public id!: number;
  public permission!: string;

  static associate(models: any) {
    // define association here
    Permission.belongsToMany(models.Role, {
      through: "PermissionRole",
    });
  }
}

Permission.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    permission: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Permission cannot be empty",
        },
      },
    },
  },
  {
    sequelize,
    modelName: "Permission",
    tableName: "permissions",
  }
);

export default Permission;
