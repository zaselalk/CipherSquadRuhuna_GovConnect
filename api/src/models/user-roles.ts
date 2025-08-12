"use strict";

import { DataTypes, Model, QueryInterface, Sequelize } from "sequelize";

interface userRolesAttributes {
  id: number;
  userId: number;
  roleId: number;
}

export class UserRoles
  extends Model<userRolesAttributes>
  implements userRolesAttributes
{
  public id!: number;
  public userId!: number;
  public roleId!: number;

  public static associate(models: any) {
    UserRoles.belongsTo(models.User, {
      foreignKey: "userId",
    });
    UserRoles.belongsTo(models.Role, {
      foreignKey: "roleId",
    });
  }
}

export default (sequelize: Sequelize) => {
  UserRoles.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "UserRoles",
      tableName: "user_roles",
    }
  );

  return UserRoles;
};
