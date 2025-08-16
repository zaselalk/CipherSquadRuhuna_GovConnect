import { describe, it, expect, vi, beforeEach } from "vitest";
import axiosInstance from "../axios/axiosInstance";
import { DepartmentService } from "../department.service";


vi.mock("../axios/axiosInstance", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("DepartmentService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getAllDepartments", () => {
    it("should fetch all departments successfully", async () => {
      const mockData = { data: { data: [{ dep_id: 1, name: "Motor" }] } };
      (axiosInstance.get as any).mockResolvedValue(mockData);

      const result = await DepartmentService.getAllDepartments();
      expect(axiosInstance.get).toHaveBeenCalledWith("/department");
      expect(result).toEqual(mockData.data.data);
    });

    it("should throw an error if API call fails", async () => {
      const errorMessage = "Unable to fetch departments";
      (axiosInstance.get as any).mockRejectedValue({
        response: { data: { message: errorMessage } },
      });

      await expect(DepartmentService.getAllDepartments()).rejects.toThrow();
    });
  });

  describe("getDepartmentById", () => {
    it("should fetch a department by ID successfully", async () => {
      const mockData = { data: { data: { dep_id: 1, name: "Motor" } } };
      (axiosInstance.get as any).mockResolvedValue(mockData);

      const result = await DepartmentService.getDepartmentById(1);
      expect(axiosInstance.get).toHaveBeenCalledWith("/department/1");
      expect(result).toEqual(mockData.data.data);
    });
  });

  describe("addDepartment", () => {
    it("should add a department successfully", async () => {
      const dept = { name: "Health", link: "/health" };
      const mockData = { data: { data: { dep_id: 2, ...dept } } };
      (axiosInstance.post as any).mockResolvedValue(mockData);

      const result = await DepartmentService.addDepartment(dept);
      expect(axiosInstance.post).toHaveBeenCalledWith("/department", dept);
      expect(result).toEqual(mockData.data);
    });

    it("should throw an error if adding department fails", async () => {
      const dept = { name: "Health" };
      const errorMessage = "Unable to add department";
      (axiosInstance.post as any).mockRejectedValue({
        response: { data: { message: errorMessage } },
      });

      await expect(DepartmentService.addDepartment(dept)).rejects.toThrow(
        errorMessage
      );
    });
  });

  describe("updateDepartmentById", () => {
    it("should update a department successfully", async () => {
      const dept = { name: "Updated Dept" };
      const mockData = { data: { data: { dep_id: 1, ...dept } } };
      (axiosInstance.put as any).mockResolvedValue(mockData);

      const result = await DepartmentService.updateDepartmentById(1, dept);
      expect(axiosInstance.put).toHaveBeenCalledWith("/department/1", dept);
      expect(result).toEqual(mockData.data.data);
    });
  });

  describe("deleteDepartmentById", () => {
    it("should delete a department successfully", async () => {
      (axiosInstance.delete as any).mockResolvedValue({});

      const result = await DepartmentService.deleteDepartmentById(1);
      expect(axiosInstance.delete).toHaveBeenCalledWith("/department/1");
      expect(result).toBeUndefined();
    });
  });
});
