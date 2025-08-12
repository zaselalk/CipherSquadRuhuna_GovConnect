import { UserServices } from "../UserServices";
import {
  UserRepository,
  UserWithPermission,
} from "../../repositories/UserRepository";
import User from "../../models/user";
import { UserNotFoundException } from "../../exceptions/UserNotFound";
import { ValidationException } from "../../exceptions/ValidatationError";
import jwt from "jsonwebtoken";

jest.mock("../../repositories/UserRepository");
jest.mock("jsonwebtoken");

describe("UserServices", () => {
  let userRepository: jest.Mocked<UserRepository>;
  let userServices: UserServices;

  beforeEach(() => {
    userRepository = new UserRepository() as jest.Mocked<UserRepository>;
    userServices = new UserServices(userRepository);
  });

  /**
   * Test case for the registerUser method
   */
  it("Should registerd user successfully", async () => {
    // mock result
    userRepository.findByEmail.mockResolvedValue(null);
    userRepository.createUser.mockResolvedValue({
      id: 1,
      name: "Test User",
      email: "test@gmail.com",
      password: "hashedPassword",
    } as User);

    const user = await userServices.registerUser(
      "Test User",
      "test@tes.com",
      "password"
    );

    expect(userRepository.createUser).toHaveBeenCalled();
    expect(user).toEqual({
      id: 1,
      name: "Test User",
      email: "test@gmail.com",
      password: "hashedPassword",
    });
  });

  /**
   * Test case for the registerUser method
   * It should throw an error if the user already exists
   */
  it("Throw error if user already exists", async () => {
    //mocking the findByEmail method to return a user
    userRepository.findByEmail.mockResolvedValue({
      id: 1,
      name: "Test User",
      email: "test@gmail.com",
      password: "hashedPassword",
    } as User);

    await expect(
      userServices.registerUser("Test User", "test@gmail.com", "password")
    ).rejects.toThrow("Email already in use");
  });

  /**
   * Test case for the login method
   * it should throw an error if email address is not found
   */
  it("Throw error if email is not found when user login", async () => {
    // mock that no user found
    userRepository.findByEmailWithPermission.mockResolvedValue(null);

    await expect(
      userServices.loginUser("test@gmail.com", "password")
    ).rejects.toThrow(UserNotFoundException);
  });

  /**
   * Test throw validation error when password not matched
   */
  it("Throw error if login password not matched", async () => {
    userRepository.findByEmailWithPermission.mockResolvedValue({
      id: 1,
      name: "Test User",
      email: "test@gmail.com",
      password: "$2b$10$IP4lW4HjfT6BYhUCvnpRkOECkYs8CSzbMVbnJ3LwIV6FAqbTzyUAu", // cha@123
    } as User);

    await expect(
      userServices.loginUser("test@gmail.com", "ch@123")
    ).rejects.toThrow(ValidationException);
  });

  /**
   * Return user object for successful login
   */
  it("Return user upon success login", async () => {
    userRepository.findByEmailWithPermission.mockResolvedValue({
      id: 1,
      name: "Test User",
      email: "test@gmail.com",
      password: "$2b$10$IP4lW4HjfT6BYhUCvnpRkOECkYs8CSzbMVbnJ3LwIV6FAqbTzyUAu", // cha@123
      role: {
        id: 1,
        role: "Doctor",
        permission: ["user:login"],
      },
    } as UserWithPermission);

    const mockedToken = "user-token";
    (jwt.sign as jest.Mock).mockReturnValue(mockedToken);

    const user = await userServices.loginUser("test@gmail.com", "cha@123");

    // expect(user).toHaveBeenCalled();
    expect(user).toEqual({
      id: 1,
      name: "Test User",
      email: "test@gmail.com",
      token: mockedToken,
      role: {
        id: 1,
        role: "Doctor",
        permission: ["user:login"],
      },
    });
  });

  /**
   * Test case for the getAllUsers method
   * it should return a list of users
   */

  /**
   * Test case for the getUserById method, It should throw error if user not found
   */
  it("Should throw userNotFound when getUserById user not found", async () => {
    userRepository.findByEmail.mockResolvedValue(null);
    expect(userServices.getUserById(1)).rejects.toThrow(UserNotFoundException);
  });
});
