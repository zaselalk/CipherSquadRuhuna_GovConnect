import { Model, DataTypes } from "sequelize";
import sequelize from "./sequelize";import { CitizenDocAttributes, CitizenDocCreationAttributes } from "../types/citizendoc";
 

/**
 * Define the CitizenDocs model
 * Represents documents uploaded by citizens
 */
export class CitizenDocs
  extends Model<CitizenDocAttributes, CitizenDocCreationAttributes>
  implements CitizenDocAttributes
{
  public id!: number;
  public citizen_id!: number;
  public document_id!: number;
  public file_name!: string;
  public file_path!: string;
  public mime_type!: string | null;
  public uploadedAt!: Date;
  public createdAt!: Date;
  public updatedAt!: Date;
  public deletedAt!: Date | null;
}

/**
 * Initialize the CitizenDocs model
 */
CitizenDocs.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    citizen_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "citizens",
        key: "id", // Corrected primary key from migration
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    document_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "document_types",
        key: "doc_id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    file_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    file_path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mime_type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    uploadedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
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
    tableName: "citizen_docs",
    timestamps: true,
    paranoid: true, // enables soft delete (deletedAt)
  }
);
