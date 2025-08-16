import { Model, DataTypes } from "sequelize";
import sequelize from "./sequelize";
import { Appointment } from "./Appoinment";
import { Citizen } from "./association";
import { DocumentType } from "./association";



export class AppointmentDocument extends Model {
  public id!: number;
  public citizen_id!: number;
  public document_id!: number;
  public file_name!: string;
  public file_path!: string;
  public mime_type!: string;
  public appointmentReferenceId!: string;
}

AppointmentDocument.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    citizen_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'citizens',
        key: 'id',
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    document_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'document_types',
        key: 'doc_id',
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
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
      allowNull: false,
    },
    appointmentReferenceId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'appointment',
        key: 'referenceId',
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  {
    sequelize,
    tableName: "appointment_documents",
  }
);

// Associations
AppointmentDocument.belongsTo(Appointment, {
  foreignKey: "appointmentReferenceId",
  targetKey: "referenceId",
});

Appointment.hasMany(AppointmentDocument, {
  foreignKey: "appointmentReferenceId",
  sourceKey: "referenceId",
});


AppointmentDocument.belongsTo(Citizen, {
  foreignKey: "citizen_id",
  targetKey: "id",
});

Citizen.hasMany(AppointmentDocument, {
  foreignKey: "citizen_id",
  sourceKey: "id",
});
// Document Associations
AppointmentDocument.belongsTo(DocumentType, {
  foreignKey: "document_id",
  targetKey: "doc_id",
});
DocumentType.hasMany(AppointmentDocument, {
  foreignKey: "document_id",
  sourceKey: "doc_id",
});
