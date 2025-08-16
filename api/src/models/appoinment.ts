import { Model, DataTypes } from "sequelize";
import sequelize from "./sequelize";
import { AppointmentDocument } from "./appointmentDocument";

export class Appointment extends Model {
  public appointmentId!: number;
  public citizenId!: number;
  public serviceId!: number;
  public appointmentDate!: string;
  public appointmentTime!: string;
  public referenceId!: string;
}

Appointment.init(
  {
    appointmentId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    citizenId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'citizen',
        key: 'id',
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    serviceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'department-service',
        key: 'service_id',
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    appointmentDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    appointmentTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    referenceId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      references: {
        model: 'appointment',
        key: 'referenceId',
      },
    },

  },
  {
    sequelize,
    tableName: "appointments",
  }
);

// Associations
Appointment.hasMany(AppointmentDocument, {
  foreignKey: "appointmentReferenceId",
  sourceKey: "referenceId",
});

AppointmentDocument.belongsTo(Appointment, {
  foreignKey: "appointmentReferenceId",
  targetKey: "referenceId",
});


