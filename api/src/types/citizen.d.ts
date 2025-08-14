export interface CitizenAttributes {
  id: number;
  fullName: string;
  email: string;
  hashPassword: string;
  dateOfBirth?: Date;
  address?: string;
  contactNumber?: string;
  NICNumber?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export type CitizenCreationAttributes = Optional<
  CitizenAttributes,
  "id" | "createdAt" | "updatedAt" | "deletedAt"
>;
