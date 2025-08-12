import { userRole } from "./user-role.types";

/**
 * User interface representing a user object.
 * @property {number} id - Unique identifier for the user.
 * @property {string} name - Full name of the user.
 * @property {string} email - Email address of the user.
 * @property {string} createdAt - Timestamp when the user was created.
 * @property {string} updatedAt - Timestamp when the user was last updated.
 * @property {Object} role - Role information of the user.
 * @property {number} role.id - Unique identifier for the role.
 * @property {string} role.role - Name of the role.
 * @property {string} role.permission - Permissions associated with the role in JSON format.
 */
export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  role: {
    id: number;
    role: string;
    permission: string;
  };
}

/**
 * Response structure for fetching all users.
 * @property {Array} data - Array of user objects.
 * @property {string} message - Response message.
 * @property {string} status - Response status.
 * @property {number} limit - Number of users per page.
 * @property {number} page - Current page number.
 * @typedef {Object} GetAllUsersResponse
 */
export interface GetAllUsersResponse {
  data: Array<User>;
  message: string;
  status: string;
  limit: number;
  page: number;
}

/**
 * Response structure for user role operations.
 * @property {userRole} data - The user role object.
 * @property {string} message - Response message.
 */
export interface UserRoleResponse {
  data: userRole;
  message: string;
}

/** * Response structure for deleting a user role.
 * @property {string} message - Response message.
 * */
export interface DeleteUserRoleResponse {
  message: string;
}

/**
 * Response structure for creating a user role.
 * @property {userRole} data - The created user role object.
 * @property {string} message - Response message.
 * @property {string} status - Response status.
 * @property {string} error - Error message if any.
 */
export interface CreateUserRoleResponse {
  data: userRole;
  message: string;
  status: string;
  error: string;
}

/**
 * Response structure for updating a user role.
 * @property {userRole} data - The updated user role object.
 * @property {string} message - Response message.
 * @property {string} status - Response status.
 * @property {string} error - Error message if any.
 */
export interface UpdateUserRoleResponse {
  data: userRole;
  message: string;
  status: string;
  error: string;
}

/**
 * Response structure for deleting a user.
 * @property {string} message - Response message.
 * @property {string} status - Response status.
 * @property {null} data - Data field, usually null for delete operations.
 * @property {string} error - Error message if any.
 */
export interface DeleteUserResponse {
  message: string;
  status: string;
  data: null;
  error: string;
}
