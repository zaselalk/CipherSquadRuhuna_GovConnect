import { UserNotFoundException } from "../exceptions/UserNotFound";
import { ValidationException } from "../exceptions/ValidatationError";
import User from "../models/user";
import { UserRepository } from "../repositories/UserRepository";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { logSuperUserAction } from "../util/superUserLogger";

/**
 * Interface representing a logged-in user with basic details and permissions.
 */
interface LoginUser {
  id: number; // Unique identifier for the user
  name: string; // Full name of the user
  email: string; // Email address of the user
  token: string; // Authentication token for the user
  role: string | null; // Role of the user (if any)
}

/**
 * Interface representing a logged-in user with a detailed role and permissions object.
 */
interface LoginUserWithPermissionObjectWithToken extends LoginUser {
  token: string; // Authentication token for the user
}

// Define the shape of the decoded token
/**
 * Interface representing the decoded structure of a JWT token.
 */
interface DecodedToken {
  id: number; // User ID extracted from the token
  iat?: number; // Issued at timestamp (optional)
}

/**
 * Service class for managing user-related operations.
 */
export class UserServices {
  constructor(private userRepository: UserRepository) {}

  /**
   * Registers a new user in the system.
   * @param name - Full name of the user.
   * @param email - Email address of the user.
   * @param password - Plain text password of the user.
   * @returns The created user object.
   * @throws UserNotFoundException if the email is already in use.
   */
  // async registerUser(
  //   name: string,
  //   email: string,
  //   password: string
  // ): Promise<User> {
  //   const excitingUser = await this.userRepository.findByEmail(email);
  //   if (excitingUser) throw new UserNotFoundException("Email already in use");

  //   const hashedPassword = await bcrypt.hash(password, 10);
  //   return this.userRepository.createUser(name, email, hashedPassword);
  // }

  /**
   * Authenticates a user and generates a JWT token.
   * @param email - Email address of the user.
   * @param password - Plain text password of the user.
   * @returns The logged-in user object with token and permissions.
   * @throws ValidationException if the username or password is invalid.
   */
  async loginUser(
    email: string,
    password: string
  ): Promise<LoginUserWithPermissionObjectWithToken | null> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new UserNotFoundException("Invalid username or password");

    const isPasswordValid = await bcrypt.compare(password, user.password);

    //why - https://security.stackexchange.com/questions/17816/username-and-or-password-invalid-why-do-websites-show-this-kind-of-message-i
    if (!isPasswordValid)
      throw new ValidationException("Invalid username or password");

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET_ADMIN as string
    );
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token: token,
      role: user.role,
    };
  }

  /**
   * Retrieves a paginated list of all users.
   * @param page - Page number for pagination.
   * @param limit - Number of users per page.
   * @returns A list of user objects.
   * @throws UserNotFoundException if no users are found.
   */
  async getAllUsers(page: number, limit: number, user: any): Promise<User[]> {
    const users = await this.userRepository.getAllUsers(page, limit, user);
    if (!users) throw new UserNotFoundException("No users found");
    return users;
  }

  /**
   * Retrieves a user by their unique ID.
   * @param id - Unique identifier of the user.
   * @returns The user object or null if not found.
   * @throws UserNotFoundException if the user is not found.
   */
  async getUserById(id: number): Promise<User | null> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new UserNotFoundException("User not found");
    return user;
  }

  /**
   * Adds a new user with a specific role.
   * @param full_name - Full name of the user.
   * @param role_id - Role ID to assign to the user.
   * @param email - Email address of the user.
   * @param password - Plain text password of the user.
   * @returns The created user object.
   * @throws UserNotFoundException if the email is already in use.
   */
  async addNewUser(
    full_name: string,
    role: string,
    email: string,
    password: string,
    phone_number: string
  ): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) throw new UserNotFoundException("Email already in use");

    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userRepository.CreateUser(
      full_name,
      role,
      email,
      hashedPassword,
      phone_number
    );
  }

  /**
   * Updates the full name of a user by their ID.
   * @param id - Unique identifier of the user.
   * @param full_name - New full name of the user.
   * @returns The updated user object or null if not found.
   * @throws UserNotFoundException if the user is not found.
   */
  async updateUserFullNameById(
    id: number,
    full_name: string
  ): Promise<User | null> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new UserNotFoundException("User not found");

    return this.userRepository.updateUserFullNameById(id, full_name);
  }

  /**
   * Changes the password of a user.
   * @param id - Unique identifier of the user.
   * @param oldPassword - Current password of the user.
   * @param newPassword - New password to set for the user.
   * @returns The updated user object or null if not found.
   * @throws UserNotFoundException if the user is not found.
   * @throws ValidationException if the old password is invalid.
   */
  async changeUserPassword(
    id: number,
    oldPassword: string,
    newPassword: string
  ): Promise<User | null> {
    console.log(`oldPassword, newPassword`, oldPassword, newPassword);
    const user = await this.userRepository.findByIdWithPassword(id);
    if (!user) throw new UserNotFoundException("User not found");

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) throw new ValidationException("Invalid old password");

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    return this.userRepository.changeUserPasswordById(id, hashedPassword);
  }

  /**
   * Deletes a user by their unique ID.
   * @param id - Unique identifier of the user.
   * @returns True if the user was successfully deleted, false otherwise.
   * @throws UserNotFoundException if the user is not found.
   */
  async deleteUserById(id: number): Promise<boolean> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new UserNotFoundException("User not found");

    return this.userRepository.deleteUserById(id);
  }

  /**
   * Verifies a JWT token and retrieves the associated user.
   * @param token - JWT token to verify.
   * @returns The decoded token object.
   * @throws ValidationException if the token is invalid.
   */
  async verifyToken(token: string): Promise<DecodedToken> {
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET_ADMIN as string
      ) as DecodedToken;
      console.log(decoded.id);
      // get the user id from the decoded token
      const userId = decoded.id;
      const user = await this.userRepository.findById(userId);
      if (!user) throw new UserNotFoundException("User not found");

      return user;
    } catch (error) {
      throw new ValidationException("Invalid token");
    }
  }
}
