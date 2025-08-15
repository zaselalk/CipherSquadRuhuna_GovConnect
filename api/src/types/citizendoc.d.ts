export interface CitizenDocAttributes {
  id: number;
  citizen_id: number;
  document_id: number;
  file_name: string;
  file_path: string;
  mime_type: string | null;
  uploadedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export type CitizenDocCreationAttributes = Omit<
  CitizenDocAttributes,
  "id" | "createdAt" | "updatedAt" | "deletedAt" | "uploadedAt"
>;
