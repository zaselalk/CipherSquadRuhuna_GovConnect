
// src/types/documenttype.ts

export interface DocumentTypeAttributes {
  id: number;
  name: string;            // Name of the document type (e.g., NIC, Passport)
  description?: string;    // Optional description
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

// For creating a new document type (ID and timestamps are excluded)
export type DocumentTypeCreationAttributes = Omit<
  DocumentTypeAttributes,
  "id" | "createdAt" | "updatedAt" | "deletedAt"
>;
