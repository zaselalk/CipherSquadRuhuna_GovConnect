// types/citizendoc.ts

export interface CitizenDocsData {
  citizen_id: number;        // ID of the citizen uploading the document
  document_id: number;       // ID of the document type
  file_name: string;         // Name of the file
  file_path: string;         // Path where the file is stored
  mime_type?: string;        // Optional MIME type
  uploadedAt?: string;       // Optional, frontend can send or backend generates
}
