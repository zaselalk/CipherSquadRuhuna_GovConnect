// src/types/officer.ts

export interface OfficerAttributes {
  id: number;              // Auto-generated primary key
  officer_id: number;       // ID from the users table
  department_id: number;    // ID of the department assigned
  createdAt: Date;          // Auto-generated timestamp
  updatedAt: Date;          // Auto-generated timestamp
  deletedAt: Date | null;   // Soft delete field
}

export type OfficerCreationAttributes = Omit<
  OfficerAttributes,
  "id" | "createdAt" | "updatedAt" | "deletedAt"
>;
