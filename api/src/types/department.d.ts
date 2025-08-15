export interface DepartmentAttributes {
  dep_id: number;
  name: string;
  link: string;
  description?: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export interface DepartmentCreationAttributes
  extends Omit<DepartmentAttributes, "dep_id" | "createdAt" | "updatedAt" | "deletedAt"> {}
