import sequelize from ".";
import { Appointment } from "./appoinment";
import { AppointmentDocument } from "./appointmentDocument";

// Import models
import { Citizen } from "./citizen";
import { CitizenDocs } from "./citizendocs";
import { Department } from "./department";
import { DepartmentService } from "./department-service";
import { DocumentType } from "./document-type";


// Define associations

// A Citizen can have many CitizenDocs
Citizen.hasMany(CitizenDocs, { foreignKey: "citizen_id" });
CitizenDocs.belongsTo(Citizen, { foreignKey: "citizen_id" });

// A DocumentType can have many CitizenDocs
DocumentType.hasMany(CitizenDocs, { foreignKey: "document_id" });
CitizenDocs.belongsTo(DocumentType, { foreignKey: "document_id" });


// ---------------------------
// DepartmentService & DocumentType (Many-to-Many)
// ---------------------------

// Create a join table for service documents
DepartmentService.belongsToMany(DocumentType, {
  through: "service_documents",
  foreignKey: "service_id",
  otherKey: "document_id",
  as: "requiredDocuments",
});

DocumentType.belongsToMany(DepartmentService, {
  through: "service_documents",
  foreignKey: "document_id",
  otherKey: "service_id",
  as: "services",
});

// ---------------------------
// Department & DepartmentService
// ---------------------------

// A Department has many services
Department.hasMany(DepartmentService, { foreignKey: "dep_id", as: "services" });
DepartmentService.belongsTo(Department, { foreignKey: "dep_id", as: "department" });



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
export { sequelize, Citizen, CitizenDocs, DocumentType, Department, DepartmentService ,Appointment,AppointmentDocument};
