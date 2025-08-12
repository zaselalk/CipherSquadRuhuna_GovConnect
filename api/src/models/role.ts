"use strict";

import {
  Model,
  DataTypes,
  BelongsToManyAddAssociationMixin,
  BelongsToManyHasAssociationMixin,
} from "sequelize";
import sequelize from "./sequelize";
import Permission from "./permission";
import User from "./user";
interface RoleAttributes {
  id?: number;
  role: string;
  permission: String;
  deletedAt?: Date | null;
}

export class Role extends Model<RoleAttributes> implements RoleAttributes {
  public id!: number;
  public role!: string;
  public permission!: String;

  //delcart association methods
  public addPermission!: BelongsToManyAddAssociationMixin<Permission, any>;
  public hasPermission!: BelongsToManyHasAssociationMixin<Permission, any>;

  static associate(models: any) {
    // define association here
    Role.belongsToMany(models.Permission, {
      through: "PermissionRole",
    });

    Role.hasMany(models.User, {
      foreignKey: "roleId",
      as: "users",
      onDelete: "RESTRICT",
    });
  }
}

Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    role: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: {
          msg: "Role cannot be empty",
        },
      },
    },
    permission: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Permissions cannot be empty",
        },
      },
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    sequelize,
    modelName: "Role",
    tableName: "roles",
    paranoid: true,
  }
);

export default Role;
