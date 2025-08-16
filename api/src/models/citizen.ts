/**
 * Define the Citizen model
 * The model is used to interact with the citizens table in the database
 **/
import { Model, DataTypes } from "sequelize";
import sequelize from "./sequelize";
import { CitizenAttributes, CitizenCreationAttributes } from "../types/citizen";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class Citizen
  extends Model<CitizenAttributes, CitizenCreationAttributes>
  implements CitizenAttributes
{
  public id!: number;
  public fullName!: string;
  public email!: string;
  public password!: string;
  public dateOfBirth!: Date;
  public address!: string;
  public contactNumber!: string;
  public NICNumber!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
  public deletedAt!: Date | null;
  public email_verified!: boolean;
  public email_verification_token?: string;
  public email_verification_expires?: Date;

  /**
   * Verify the password
   * @param password - The password to verify
   * @return A boolean indicating whether the password is valid
   */
  public async validatePassword(
    password: string,
    hashPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashPassword);
  }

  /**
   * Generate a JWT token for the citizen
   * @return A JWT token as a string
   */
  public async generateToken(): Promise<string> {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET_CITIZEN as string, {
      expiresIn: "1h",
    });
  }
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
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contactNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    NICNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
    email_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    email_verification_token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email_verification_expires: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },

  {
    sequelize: sequelize,
    tableName: "citizens",
    timestamps: true,
    paranoid: true,
    hooks: {
      beforeCreate: async (citizen) => {
        if (citizen.password) {
          const salt = await bcrypt.genSalt(10);
          citizen.password = await bcrypt.hash(citizen.password, salt);
        }
      },
      beforeUpdate: async (citizen) => {
        if (citizen.changed("password")) {
          const salt = await bcrypt.genSalt(10);
          citizen.password = await bcrypt.hash(citizen.password, salt);
        }
      },
    },
  }
);
