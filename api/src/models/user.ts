import { Model, DataTypes } from "sequelize";
import sequelize from "./sequelize";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/* Define the User model properties
  Extra properties like id, createdAt, and updatedAt are added by default
  Note: id not defined here, as it is added by default
*/
export interface UserAttributes {
  id?: number;
  name: string;
  email: string;
  password?: string;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
  phone_number?: string;
  deletedAt?: Date | null;
}

/**
 * Define the User model
 * The model is used to interact with the users table in the database
 */
export class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public role!: string;
  public phone_number?: string;
  public createdAt!: Date;
  public updatedAt!: Date;
  public deletedAt?: Date | null;

  //association
  static associate(models: any) {
    // define association here
    User.belongsTo(models.Role, {
      foreignKey: "roleId",
      as: "role",
    });
  }

  // validate password
  public async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }

  // generate token
  public async generateToken(): Promise<string> {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET_ADMIN as string, {
      expiresIn: "1h",
    });
  }
}

/**
 * Initialize the User model, if you added extra properties to the User model,
 * make sure to create migrations to update the database schema
 */
User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
  },

  {
    sequelize: sequelize,
    modelName: "User",
    tableName: "users",
  }
);

export default User;
