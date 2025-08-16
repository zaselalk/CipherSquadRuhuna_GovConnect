// src/types/documenttype.ts

export interface DocumentTypeAttributes {
  id: number;
  name: string;          // e.g., "NIC", "Passport", "License"
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export type DocumentTypeCreationAttributes = Omit<
  DocumentTypeAttributes,
  "id" | "createdAt" | "updatedAt" | "deletedAt"
>;
