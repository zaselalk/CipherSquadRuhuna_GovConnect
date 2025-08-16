import sequelize from ".";
import { Appointment } from "./Appoinment";
import { AppointmentDocument } from "./appointmentDocument";

// Import models
import { Citizen } from "./citizen";
import { CitizenDocs } from "./citizendocs";
import { DocumentType } from "./document-type";


// Define associations

// A Citizen can have many CitizenDocs
Citizen.hasMany(CitizenDocs, { foreignKey: "citizen_id" });
CitizenDocs.belongsTo(Citizen, { foreignKey: "citizen_id" });

// A DocumentType can have many CitizenDocs
DocumentType.hasMany(CitizenDocs, { foreignKey: "document_id" });
CitizenDocs.belongsTo(DocumentType, { foreignKey: "document_id" });


// Associations
Appointment.hasMany(AppointmentDocument, {
  foreignKey: "appointmentReferenceId",
  sourceKey: "referenceId",
  as: "documents",
});

AppointmentDocument.belongsTo(Appointment, {
  foreignKey: "appointmentReferenceId",
  targetKey: "referenceId",
  as: "appointment",
});

// Exporting models and sequelize instance
export { sequelize, Citizen, DocumentType, CitizenDocs ,Appointment,AppointmentDocument };
