// tests/DepartmentServicesApi.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import axiosInstance from "../axios/axiosInstance";
import publicAxios from "../axios/publicaxios";
import { DepartmentService, DepartmentServicesApi } from "../service.service";


// Mock both axios instances
vi.mock("../axios/axiosInstance", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

vi.mock("../axios/publicaxios", () => ({
  default: {
    get: vi.fn(),
  },
}));

describe("DepartmentServicesApi", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getAllServices", () => {
    it("should fetch all services successfully", async () => {
      const mockData = {
        data: {
          status: 200,
          message: "Success",
          error: null,
          data: [{ service_id: 1, dep_id: 1, name: "Service 1" }],
        },
      };
      (publicAxios.get as any).mockResolvedValue(mockData);

      const result = await DepartmentServicesApi.getAllServices();
      expect(publicAxios.get).toHaveBeenCalledWith("/depservice");
      expect(result).toEqual(mockData.data.data);
    });
  });

  describe("getServicesByDepartment", () => {
    it("should fetch services by department ID successfully", async () => {
      const dep_id = 1;
      const mockData = {
        data: {
          status: 200,
          message: "Success",
          error: null,
          data: [{ service_id: 1, dep_id, name: "Service 1" }],
        },
      };
      (axiosInstance.get as any).mockResolvedValue(mockData);

      const result = await DepartmentServicesApi.getServicesByDepartment(dep_id);
      expect(axiosInstance.get).toHaveBeenCalledWith(`/depservice/department/${dep_id}`);
      expect(result).toEqual(mockData.data.data);
    });
  });

  describe("getServiceById", () => {
    it("should fetch a single service by ID successfully", async () => {
      const service_id = 1;
      const mockData = {
        data: {
          status: 200,
          message: "Success",
          error: null,
          data: { service_id, dep_id: 1, name: "Service 1" },
        },
      };
      (axiosInstance.get as any).mockResolvedValue(mockData);

      const result = await DepartmentServicesApi.getServiceById(service_id);
      expect(axiosInstance.get).toHaveBeenCalledWith(`/depservice/${service_id}`);
      expect(result).toEqual(mockData.data.data);
    });
  });

  describe("addService", () => {
    it("should add a service successfully", async () => {
      const newService: Partial<DepartmentService> = { dep_id: 1, name: "New Service" };
      (axiosInstance.post as any).mockResolvedValue({});

      await DepartmentServicesApi.addService(newService);
      expect(axiosInstance.post).toHaveBeenCalledWith("/depservice", newService);
    });
  });

  describe("updateServiceById", () => {
    it("should update a service successfully", async () => {
      const service_id = 1;
      const updatedService: Partial<DepartmentService> = { name: "Updated Service" };
      const mockData = {
        data: {
          status: 200,
          message: "Success",
          error: null,
          data: { service_id, dep_id: 1, ...updatedService },
        },
      };
      (axiosInstance.put as any).mockResolvedValue(mockData);

      const result = await DepartmentServicesApi.updateServiceById(service_id, updatedService);
      expect(axiosInstance.put).toHaveBeenCalledWith(`/depservice/${service_id}`, updatedService);
      expect(result).toEqual(mockData.data.data);
    });
  });

  describe("deleteServiceById", () => {
    it("should delete a service successfully", async () => {
      const service_id = 1;
      (axiosInstance.delete as any).mockResolvedValue({});

      await DepartmentServicesApi.deleteServiceById(service_id);
      expect(axiosInstance.delete).toHaveBeenCalledWith(`/depservice/${service_id}`);
    });
  });
});
