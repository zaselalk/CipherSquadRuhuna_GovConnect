/**
 * Represents a user role with associated permissions and metadata.
 *
 */
export interface userRole {
  createdAt: Date;
  id: number;
  permission: string[];
  role: string;
  updatedAt: Date;
}

/**
 * Represents a new user role to be created, including its name and permissions.
 */
export interface NewUserRole {
  role: string;
  permission: string[];
}

/**
 * Props for the UserRoleCreateModal component.
 * @param isCreateNewRole - Indicates if the modal is open for creating a new role.
 * @param setIsCreateNewRole - Function to set the modal's open state.
 * @param refetch - Function to refetch the user roles after creating a new role.
 */

export interface UserRoleCreateModalProps {
  isCreateNewRole: boolean;
  setIsCreateNewRole: (isOpen: boolean) => void;
  refetch: () => void;
}
