// tests/DepartmentController.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { DepartmentController } from "../controllers/DepartmentController";
import { DepartmentService } from "../services/DepartmentServices";

// Mock DepartmentService
vi.mock("../services/DepartmentServices", () => ({
  DepartmentService: vi.fn().mockImplementation(() => ({
    getAllDepartments: vi.fn(),
    getDepartmentById: vi.fn(),
    createDepartment: vi.fn(),
    updateDepartment: vi.fn(),
    deleteDepartment: vi.fn(),
  })),
}));

// Helper to create mock req/res
const mockReq = (body = {}, params = {}) => ({ body, params } as any);
const mockRes = () => {
  const res: any = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
};

// Sample mock department
const mockDepartment = { id: 1, name: "Motor Vehicle Department", link: "/mvd" };

describe("DepartmentController", () => {
  let controller: DepartmentController;

  beforeEach(() => {
    vi.clearAllMocks();
    controller = new DepartmentController();
  });

  it("getAllDepartments should return all departments", async () => {
    (DepartmentService.prototype.getAllDepartments as any).mockResolvedValue([mockDepartment]);

    const req = mockReq();
    const res = mockRes();
    await controller.getAllDepartments(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Departments retrieved successfully",
      status: 200,
      error: null,
      data: [mockDepartment],
    });
  });

  it("getDepartmentById should return a department by ID", async () => {
    (DepartmentService.prototype.getDepartmentById as any).mockResolvedValue(mockDepartment);

    const req = mockReq({}, { id: "1" });
    const res = mockRes();
    await controller.getDepartmentById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Department retrieved successfully",
      status: 200,
      error: null,
      data: mockDepartment,
    });
  });

  it("getDepartmentById should return 404 if not found", async () => {
    (DepartmentService.prototype.getDepartmentById as any).mockResolvedValue(null);

    const req = mockReq({}, { id: "999" });
    const res = mockRes();
    await controller.getDepartmentById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Department not found",
      status: 404,
      error: null,
      data: null,
    });
  });

  it("createDepartment should create a new department", async () => {
    (DepartmentService.prototype.createDepartment as any).mockResolvedValue(mockDepartment);

    const req = mockReq({ name: "Motor Vehicle Department", link: "/mvd" });
    const res = mockRes();
    await controller.createDepartment(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Department created successfully",
      status: 201,
      error: null,
      data: mockDepartment,
    });
  });

  it("updateDepartment should update a department", async () => {
    const updatedDept = { ...mockDepartment, name: "Updated Department" };
    (DepartmentService.prototype.updateDepartment as any).mockResolvedValue(updatedDept);

    const req = mockReq({ name: "Updated Department" }, { id: "1" });
    const res = mockRes();
    await controller.updateDepartment(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Department updated successfully",
      status: 200,
      error: null,
      data: updatedDept,
    });
  });

  it("updateDepartment should return 404 if department not found", async () => {
    (DepartmentService.prototype.updateDepartment as any).mockResolvedValue(null);

    const req = mockReq({ name: "Updated Department" }, { id: "999" });
    const res = mockRes();
    await controller.updateDepartment(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Department not found",
      status: 404,
      error: null,
      data: null,
    });
  });

  it("deleteDepartment should delete a department", async () => {
    (DepartmentService.prototype.deleteDepartment as any).mockResolvedValue(true);

    const req = mockReq({}, { id: "1" });
    const res = mockRes();
    await controller.deleteDepartment(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Department deleted successfully",
      status: 200,
      error: null,
      data: null,
    });
  });

  it("deleteDepartment should return 404 if not found", async () => {
    (DepartmentService.prototype.deleteDepartment as any).mockResolvedValue(false);

    const req = mockReq({}, { id: "999" });
    const res = mockRes();
    await controller.deleteDepartment(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Department not found",
      status: 404,
      error: null,
      data: null,
    });
  });
});
