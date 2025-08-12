"use strict";

import { DataTypes, Model, Sequelize } from "sequelize";

interface PermissionRoleAttributes {
  id: number;
  permissionId: number;
  roleId: number;
}

export class PermissionRole
  extends Model<PermissionRoleAttributes>
  implements PermissionRoleAttributes
{
  public id!: number;
  public permissionId!: number;
  public roleId!: number;

  public static associate(models: any) {
    PermissionRole.belongsTo(models.Permission, {
      foreignKey: "permissionId",
    });
    PermissionRole.belongsTo(models.Role, {
      foreignKey: "roleId",
    });
  }
}

export default (sequelize: Sequelize) => {
  PermissionRole.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      permissionId: {
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
      modelName: "PermissionRole",
      tableName: "permission_roles",
    }
  );

  return PermissionRole;
};
