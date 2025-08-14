/**
 * Define the Citizen model
 * The model is used to interact with the citizens table in the database
 **/
import { Model, DataTypes } from "sequelize";
import sequelize from "./sequelize";
import { CitizenAttributes, CitizenCreationAttributes } from "../types/citizen";

export class Citizen
  extends Model<CitizenAttributes, CitizenCreationAttributes>
  implements CitizenAttributes
{
  public id!: number;
  public fullName!: string;
  public email!: string;
  public hashPassword!: string;
  public dateOfBirth?: Date;
  public address?: string;
  public contactNumber?: string;
  public NICNumber?: string;
  public createdAt!: Date;
  public updatedAt!: Date;
  public deletedAt?: Date | null;
}

/**
 * Initialize the Citizen model
 */
Citizen.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    hashPassword: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    contactNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    NICNumber: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
  },
  {
    sequelize: sequelize,
    tableName: "citizens",
    timestamps: true,
    paranoid: true,
  }
);
