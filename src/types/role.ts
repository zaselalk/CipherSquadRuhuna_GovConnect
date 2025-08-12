/**
 * Represents the data structure for a role within the system.
 *
 * @interface RoleData
 *
 * @property {number} id - The unique identifier for the role.
 * @property {string} role - The name of the role.
 * @property {string[]} permissions - A list of permissions associated with the role.
 * @property {string} createdAt - The timestamp indicating when the role was created.
 * @property {string} updatedAt - The timestamp indicating when the role was last updated.
 */
export interface RoleData {
  id: number;
  role: string;
  permissions: string[];
  createdAt: string;
  updatedAt: string;
}

export interface RolesResponse {
  // status: string;
  message: string;
  data: RoleData[];
}
