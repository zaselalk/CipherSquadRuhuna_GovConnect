import { Model, DataTypes } from "sequelize";
import sequelize from "./sequelize";

export class Appointment extends Model {
  public appointmentId!: number;
  public citizenId!: number;
  public serviceId!: number;
  public appointmentDate!: string;
  public appointmentTime!: string;
  public referenceId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Appointment.init(
  {
    appointmentId: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    citizenId: { type: DataTypes.INTEGER, allowNull: false },
    serviceId: { type: DataTypes.INTEGER, allowNull: false },
    appointmentDate: { type: DataTypes.DATEONLY, allowNull: false },
    appointmentTime: { type: DataTypes.TIME, allowNull: false },
    referenceId: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  { sequelize, tableName: "appointments" }
);
