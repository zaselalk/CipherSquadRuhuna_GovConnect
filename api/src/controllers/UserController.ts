import { Request, Response } from "express";
import { UserServices } from "../services/UserServices";
import { UserRepository } from "../repositories/UserRepository";
import { ForeignKeyConstraintError } from "sequelize";

/**
 * Controller for handling user-related operations.
 */
export class UserController {
  private userService: UserServices;

  /**
   * Initializes the UserController with a UserService instance.
   */
  constructor() {
    const userRepositoy = new UserRepository();
    this.userService = new UserServices(userRepositoy);
  }

  /**
   * Registers a new user.
   * @param req - The HTTP request object containing user details.
   * @param res - The HTTP response object.
   * @returns A response with a success message and user data.
   */
  register = async (req: Request, res: Response): Promise<Response | void> => {
    const { name, email, password } = req.body;
    const user = await this.userService.registerUser(name, email, password);
    return res.json({
      message: "User registered successfully",
      data: {
        name: user.name,
        email: user.email,
      },
    });
  };

  /**
   * Adds a new user with a specific role.
   * @param req - The HTTP request object containing user details.
   * @param res - The HTTP response object.
   * @returns A response with a success message and user data.
   * Handles foreign key constraint errors for role_id.
   */
  addNewUser = async (
    req: Request,
    res: Response
  ): Promise<Response | void> => {
    const { full_name, role_id, email, password, phone_number } = req.body;
    try {
      const user = await this.userService.addNewUser(
        full_name,
        role_id,
        email,
        password,
        phone_number
      );
      return res.status(201).json({
        message: "User added successfully",
        status: 201,
        error: null,
        data: {
          full_name: user.name,
          role_id: user.roleId,
          email: user.email,
        },
      });
    } catch (error) {
      // Handle specific foreign key constraint error for role_id
      if (
        error instanceof ForeignKeyConstraintError &&
        (error.original as { code?: string })?.code === "ER_NO_REFERENCED_ROW_2"
      ) {
        return res.status(400).json({
          message: "Invalid role ID provided",
          status: 400,
          error: "Please provide a valid role ID",
          data: null,
        });
      }

      throw error; // rethrow the error for global error handler
    }
  };

  /**
   * Logs in a user.
   * @param req - The HTTP request object containing login credentials.
   * @param res - The HTTP response object.
   * @returns A response with a success message and user data.
   */
  login = async (req: Request, res: Response): Promise<Response | void> => {
    const { email, password } = req.body;
    const user = await this.userService.loginUser(email, password);
    return res.status(200).json({ message: "Login successful", user });
  };

  /**
   * Retrieves a paginated list of all users.
   * @param req - The HTTP request object containing pagination parameters.
   * @param res - The HTTP response object.
   * @returns A response with a list of users.
   */
  getAllUsers = async (req: Request, res: Response): Promise<Response> => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const users = await this.userService.getAllUsers(page, limit, req.user);

    if (!users) throw new Error("No users found");
    return res.status(200).json({
      message: "Users fetched successfully",
      status: 200,
      page: page,
      limit: limit,
      data: users,
    });
  };

  /**
   * Retrieves a single user by ID.
   * @param req - The HTTP request object containing the user ID.
   * @param res - The HTTP response object.
   * @returns A response with the user data or an error message if not found.
   */
  getSingleUser = async (
    req: Request,
    res: Response
  ): Promise<Response | void> => {
    const { id } = req.params;
    const user = await this.userService.getUserById(parseInt(id));
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        status: 404,
        error: null,
        data: null,
      });
    }
    return res.status(200).json({
      message: "User fetched successfully",
      status: 200,
      error: null,
      data: user,
    });
  };

  /**
   * Updates a user's full name by ID.
   * @param req - The HTTP request object containing the user ID and new full name.
   * @param res - The HTTP response object.
   * @returns A response with the updated user data or an error message if not found.
   */
  updateUserFullNameById = async (
    req: Request,
    res: Response
  ): Promise<Response | void> => {
    const { id } = req.params;
    const { full_name } = req.body;
    const user = await this.userService.updateUserFullNameById(
      parseInt(id),
      full_name
    );
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        status: 404,
        error: null,
        data: null,
      });
    }
    return res.status(200).json({
      message: "User updated successfully",
      status: 200,
      error: null,
      data: user,
    });
  };

  /**
   * Updates a user's role by ID.
   * @param req - The HTTP request object containing the user ID and new role ID.
   * @param res - The HTTP response object.
   * @returns A response with the updated user data or an error message if not found.
   */
  updateUserRoleById = async (
    req: Request,
    res: Response
  ): Promise<Response | void> => {
    const { id } = req.params;
    const { role_id } = req.body;
    const user = await this.userService.updateUserRoleById(
      parseInt(id),
      role_id
    );
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        status: 404,
        error: null,
        data: null,
      });
    }
    return res.status(200).json({
      message: "User updated successfully",
      status: 200,
      error: null,
      data: user,
    });
  };

  /**
   * Changes a user's password.
   * @param req - The HTTP request object containing the user ID, old password, and new password.
   * @param res - The HTTP response object.
   * @returns A response with a success message or an error message if not found or invalid.
   */
  changeUserPassword = async (
    req: Request,
    res: Response
  ): Promise<Response | void> => {
    const { id } = req.params;
    const { password: oldPassword, new_password: newPassword } = req.body;

    // if the password is same
    if (oldPassword === newPassword) {
      return res.status(400).json({
        message: "New password cannot be the same as the old password",
        status: 400,
        error: null,
        data: null,
      });
    }

    const user = await this.userService.changeUserPassword(
      parseInt(id),
      oldPassword,
      newPassword
    );
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        status: 404,
        error: null,
        data: null,
      });
    }
    return res.status(200).json({
      message: "User password updated successfully",
      status: 200,
      error: null,
      data: user,
    });
  };

  /**
   * Deletes a user by ID.
   * @param req - The HTTP request object containing the user ID.
   * @param res - The HTTP response object.
   * @returns A response with a success message or an error message if not found.
   */
  deleteUser = async (
    req: Request,
    res: Response
  ): Promise<Response | void> => {
    const { id } = req.params;
    const deleted = await this.userService.deleteUserById(parseInt(id));

    if (!deleted) {
      return res.status(404).json({
        message: "User not found",
        status: 404,
        error: null,
        data: null,
      });
    }

    return res.status(200).json({
      message: "User deleted successfully",
      status: 200,
      error: null,
      data: null,
    });
  };

  /**
   * Checks the authentication status of a user based on a token.
   * @param req - The HTTP request object containing the authorization header.
   * @param res - The HTTP response object.
   * @returns A response indicating whether the token is valid or not.
   */
  checkAuthStatus = async (
    req: Request,
    res: Response
  ): Promise<Response | void> => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "No token provided",
        status: 401,
        error: null,
        data: null,
      });
    }

    try {
      const userStatus = await this.userService.verifyToken(token);
      return res.status(200).json({
        message: "Token is valid",
        status: 200,
        error: null,
        data: userStatus,
      });
    } catch (error) {
      return res.status(401).json({
        message: "Invalid token",
        status: 401,
        error: (error as Error).message,
        data: null,
      });
    }
  };
}
