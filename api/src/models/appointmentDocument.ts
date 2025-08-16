import { Model, DataTypes } from "sequelize";
import sequelize from "./sequelize";

export class AppointmentDocument extends Model {
  public id!: number;
  public citizen_id!: number;
  public document_id!: number;
  public file_name!: string;
  public file_path!: string;
  public mime_type!: string;
  public appointmentReferenceId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

AppointmentDocument.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    citizen_id: { type: DataTypes.INTEGER, allowNull: false },
    document_id: { type: DataTypes.INTEGER, allowNull: false },
    file_name: { type: DataTypes.STRING, allowNull: false },
    file_path: { type: DataTypes.STRING, allowNull: false },
    mime_type: { type: DataTypes.STRING, allowNull: false },
    appointmentReferenceId: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, tableName: "appointment_documents" }
);
