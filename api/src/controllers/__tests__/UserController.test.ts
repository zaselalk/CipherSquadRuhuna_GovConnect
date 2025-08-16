import { Request, Response } from "express";
import { UserController } from "../UserController";
import { UserServices } from "../../services/UserServices";
import { UserRepository } from "../../repositories/UserRepository";
import { ForeignKeyConstraintError } from "sequelize";

// Mock the dependencies
jest.mock("../../services/UserServices");
jest.mock("../../repositories/UserRepository");

describe("UserController", () => {
  let userController: UserController;
  let mockUserService: jest.Mocked<UserServices>;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();

    // Create mock instances
    mockUserService = {
      addNewUser: jest.fn(),
      loginUser: jest.fn(),
      getAllUsers: jest.fn(),
      getUserById: jest.fn(),
      updateUserFullNameById: jest.fn(),
      changeUserPassword: jest.fn(),
      deleteUserById: jest.fn(),
      verifyToken: jest.fn(),
    } as any;

    // Mock the UserServices constructor to return our mock
    (UserServices as jest.MockedClass<typeof UserServices>).mockImplementation(
      () => mockUserService
    );

    userController = new UserController();

    // Setup mock request and response
    mockRequest = {
      body: {},
      params: {},
      query: {},
      headers: {},
      user: undefined,
    };

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  describe("addNewUser", () => {
    it("should successfully add a new user", async () => {
      // Arrange
      const userData = {
        full_name: "John Doe",
        role: "admin",
        email: "john@example.com",
        password: "password123",
        phone_number: "1234567890",
      };
      mockRequest.body = userData;

      const mockUser = {
        name: "John Doe",
        email: "john@example.com",
      };
      mockUserService.addNewUser.mockResolvedValue(mockUser as any);

      // Act
      await userController.addNewUser(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockUserService.addNewUser).toHaveBeenCalledWith(
        userData.full_name,
        userData.role,
        userData.email,
        userData.password,
        userData.phone_number
      );
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "User added successfully",
        status: 201,
        error: null,
        data: {
          full_name: mockUser.name,
          email: mockUser.email,
        },
      });
    });

    it("should handle foreign key constraint error for invalid role", async () => {
      // Arrange
      const userData = {
        full_name: "John Doe",
        role: "invalid_role",
        email: "john@example.com",
        password: "password123",
        phone_number: "1234567890",
      };
      mockRequest.body = userData;

      const foreignKeyError = new ForeignKeyConstraintError({} as any);
      // Mock the original property separately
      (foreignKeyError as any).original = { code: "ER_NO_REFERENCED_ROW_2" };

      mockUserService.addNewUser.mockRejectedValue(foreignKeyError);

      // Act
      await userController.addNewUser(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Invalid role ID provided",
        status: 400,
        error: "Please provide a valid role ID",
        data: null,
      });
    });

    it("should rethrow other errors", async () => {
      // Arrange
      const userData = {
        full_name: "John Doe",
        role: "admin",
        email: "john@example.com",
        password: "password123",
        phone_number: "1234567890",
      };
      mockRequest.body = userData;

      const genericError = new Error("Database connection failed");
      mockUserService.addNewUser.mockRejectedValue(genericError);

      // Act & Assert
      await expect(
        userController.addNewUser(mockRequest as Request, mockResponse as Response)
      ).rejects.toThrow("Database connection failed");
    });
  });

  describe("login", () => {
    it("should successfully login a user", async () => {
      // Arrange
      const loginData = {
        email: "john@example.com",
        password: "password123",
      };
      mockRequest.body = loginData;

      const mockUser = {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        token: "mock-jwt-token",
      };
      mockUserService.loginUser.mockResolvedValue(mockUser as any);

      // Act
      await userController.login(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockUserService.loginUser).toHaveBeenCalledWith(
        loginData.email,
        loginData.password
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Login successful",
        user: mockUser,
      });
    });
  });

  describe("getAllUsers", () => {
    it("should successfully fetch all users with default pagination", async () => {
      // Arrange
      mockRequest.query = {};
      mockRequest.user = { 
        id: 1, 
        name: "Admin User",
        email: "admin@example.com",
        role: "admin" 
      };

      const mockUsers = [
        { id: 1, name: "John Doe", email: "john@example.com" },
        { id: 2, name: "Jane Doe", email: "jane@example.com" },
      ];
      mockUserService.getAllUsers.mockResolvedValue(mockUsers as any);

      // Act
      await userController.getAllUsers(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockUserService.getAllUsers).toHaveBeenCalledWith(1, 10, mockRequest.user);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Users fetched successfully",
        status: 200,
        page: 1,
        limit: 10,
        data: mockUsers,
      });
    });

    it("should fetch users with custom pagination", async () => {
      // Arrange
      mockRequest.query = { page: "2", limit: "5" };
      mockRequest.user = { 
        id: 1, 
        name: "Admin User",
        email: "admin@example.com",
        role: "admin" 
      };

      const mockUsers = [{ id: 3, name: "Bob Smith", email: "bob@example.com" }];
      mockUserService.getAllUsers.mockResolvedValue(mockUsers as any);

      // Act
      await userController.getAllUsers(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockUserService.getAllUsers).toHaveBeenCalledWith(2, 5, mockRequest.user);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Users fetched successfully",
        status: 200,
        page: 2,
        limit: 5,
        data: mockUsers,
      });
    });

    it("should throw error when no users found", async () => {
      // Arrange
      mockRequest.query = {};
      mockRequest.user = { 
        id: 1, 
        name: "Admin User",
        email: "admin@example.com",
        role: "admin" 
      };
      mockUserService.getAllUsers.mockResolvedValue(null as any);

      // Act & Assert
      await expect(
        userController.getAllUsers(mockRequest as Request, mockResponse as Response)
      ).rejects.toThrow("No users found");
    });
  });

  describe("getSingleUser", () => {
    it("should successfully fetch a single user", async () => {
      // Arrange
      mockRequest.params = { id: "1" };
      const mockUser = { id: 1, name: "John Doe", email: "john@example.com" };
      mockUserService.getUserById.mockResolvedValue(mockUser as any);

      // Act
      await userController.getSingleUser(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockUserService.getUserById).toHaveBeenCalledWith(1);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "User fetched successfully",
        status: 200,
        error: null,
        data: mockUser,
      });
    });

    it("should return 404 when user not found", async () => {
      // Arrange
      mockRequest.params = { id: "999" };
      mockUserService.getUserById.mockResolvedValue(null as any);

      // Act
      await userController.getSingleUser(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockUserService.getUserById).toHaveBeenCalledWith(999);
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "User not found",
        status: 404,
        error: null,
        data: null,
      });
    });
  });

  describe("updateUserFullNameById", () => {
    it("should successfully update user full name", async () => {
      // Arrange
      mockRequest.params = { id: "1" };
      mockRequest.body = { full_name: "John Updated" };
      const mockUpdatedUser = { id: 1, name: "John Updated", email: "john@example.com" };
      mockUserService.updateUserFullNameById.mockResolvedValue(mockUpdatedUser as any);

      // Act
      await userController.updateUserFullNameById(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockUserService.updateUserFullNameById).toHaveBeenCalledWith(1, "John Updated");
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "User updated successfully",
        status: 200,
        error: null,
        data: mockUpdatedUser,
      });
    });

    it("should return 404 when user not found for update", async () => {
      // Arrange
      mockRequest.params = { id: "999" };
      mockRequest.body = { full_name: "John Updated" };
      mockUserService.updateUserFullNameById.mockResolvedValue(null as any);

      // Act
      await userController.updateUserFullNameById(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockUserService.updateUserFullNameById).toHaveBeenCalledWith(999, "John Updated");
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "User not found",
        status: 404,
        error: null,
        data: null,
      });
    });
  });

  describe("changeUserPassword", () => {
    it("should successfully change user password", async () => {
      // Arrange
      mockRequest.params = { id: "1" };
      mockRequest.body = {
        password: "oldPassword123",
        new_password: "newPassword123",
      };
      const mockUpdatedUser = { id: 1, name: "John Doe", email: "john@example.com" };
      mockUserService.changeUserPassword.mockResolvedValue(mockUpdatedUser as any);

      // Act
      await userController.changeUserPassword(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockUserService.changeUserPassword).toHaveBeenCalledWith(
        1,
        "oldPassword123",
        "newPassword123"
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "User password updated successfully",
        status: 200,
        error: null,
        data: mockUpdatedUser,
      });
    });

    it("should return 400 when new password is same as old password", async () => {
      // Arrange
      mockRequest.params = { id: "1" };
      mockRequest.body = {
        password: "samePassword123",
        new_password: "samePassword123",
      };

      // Act
      await userController.changeUserPassword(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockUserService.changeUserPassword).not.toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "New password cannot be the same as the old password",
        status: 400,
        error: null,
        data: null,
      });
    });

    it("should return 404 when user not found for password change", async () => {
      // Arrange
      mockRequest.params = { id: "999" };
      mockRequest.body = {
        password: "oldPassword123",
        new_password: "newPassword123",
      };
      mockUserService.changeUserPassword.mockResolvedValue(null as any);

      // Act
      await userController.changeUserPassword(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockUserService.changeUserPassword).toHaveBeenCalledWith(
        999,
        "oldPassword123",
        "newPassword123"
      );
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "User not found",
        status: 404,
        error: null,
        data: null,
      });
    });
  });

  describe("deleteUser", () => {
    it("should successfully delete a user", async () => {
      // Arrange
      mockRequest.params = { id: "1" };
      mockUserService.deleteUserById.mockResolvedValue(true as any);

      // Act
      await userController.deleteUser(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockUserService.deleteUserById).toHaveBeenCalledWith(1);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "User deleted successfully",
        status: 200,
        error: null,
        data: null,
      });
    });

    it("should return 404 when user not found for deletion", async () => {
      // Arrange
      mockRequest.params = { id: "999" };
      mockUserService.deleteUserById.mockResolvedValue(false as any);

      // Act
      await userController.deleteUser(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockUserService.deleteUserById).toHaveBeenCalledWith(999);
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "User not found",
        status: 404,
        error: null,
        data: null,
      });
    });
  });

  describe("checkAuthStatus", () => {
    it("should return 401 when no token provided", async () => {
      // Arrange
      mockRequest.headers = {};

      // Act
      await userController.checkAuthStatus(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockUserService.verifyToken).not.toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "No token provided",
        status: 401,
        error: null,
        data: null,
      });
    });

    it("should return 401 when authorization header has no Bearer token", async () => {
      // Arrange
      mockRequest.headers = { authorization: "InvalidToken" };

      // Act
      await userController.checkAuthStatus(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockUserService.verifyToken).not.toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "No token provided",
        status: 401,
        error: null,
        data: null,
      });
    });

    it("should successfully verify valid token", async () => {
      // Arrange
      mockRequest.headers = { authorization: "Bearer valid-jwt-token" };
      const mockUserStatus = {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        role: "admin",
      };
      mockUserService.verifyToken.mockResolvedValue(mockUserStatus as any);

      // Act
      await userController.checkAuthStatus(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockUserService.verifyToken).toHaveBeenCalledWith("valid-jwt-token");
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Token is valid",
        status: 200,
        error: null,
        data: mockUserStatus,
      });
    });

    it("should return 401 when token is invalid", async () => {
      // Arrange
      mockRequest.headers = { authorization: "Bearer invalid-jwt-token" };
      const tokenError = new Error("Invalid token signature");
      mockUserService.verifyToken.mockRejectedValue(tokenError);

      // Act
      await userController.checkAuthStatus(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockUserService.verifyToken).toHaveBeenCalledWith("invalid-jwt-token");
      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Invalid token",
        status: 401,
        error: "Invalid token signature",
        data: null,
      });
    });
  });
});
