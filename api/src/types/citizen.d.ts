export interface CitizenAttributes {
  id: number;
  fullName: string;
  email: string;
  password: string;
  dateOfBirth: Date;
  address: string;
  contactNumber: string;
  NICNumber: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export type CitizenCreationAttributes = Omit<
  CitizenAttributes,
  "id" | "createdAt" | "updatedAt" | "deletedAt" | "hashPassword"
>;

/**
 * export type CitizenCreationAttributes = Omit<CitizenAttributes, "hashPassword"> & {
  password: string; // Replacing hashPassword with password
};
 */
