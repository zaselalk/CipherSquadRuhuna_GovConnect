import { UserController } from "../UserController";

describe("UserController - Basic Test", () => {
  it("should create an instance", () => {
    const controller = new UserController();
    expect(controller).toBeDefined();
  });
});
