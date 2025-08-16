import { Officer } from "../models/officer";

export class OfficerRepository {
    private static instance: OfficerRepository;

    private constructor() { }

    public static getInstance(): OfficerRepository {
        if (!OfficerRepository.instance) {
            OfficerRepository.instance = new OfficerRepository();
        }
        return OfficerRepository.instance;
    }

    // Define your repository methods here
    public async findAll(): Promise<Officer[]> {
        try {
            return Officer.findAll();
        } catch (error) {
            console.error("Error fetching all officers:", error);
            throw error;
        }
    }

    public async findById(id: number): Promise<Officer | null> {
        try {
            return Officer.findByPk(id);
        } catch (error) {
            console.error("Error finding officer by ID:", error);
            throw error;
        }
    }

    public async create(officer: Partial<Officer>): Promise<Officer> {
        try {
            return await Officer.create(officer as any);
        } catch (error) {
            console.error("Error creating officer:", error);
            throw error;
        }
    }

    public async update(id: number, officer: Partial<Officer>): Promise<[number]> {
        try {
            return await Officer.update(officer, { where: { id } });
        } catch (error) {
            console.error("Error updating officer:", error);
            throw error;
        }
    }

    public async delete(id: number): Promise<number> {
        try {
            return await Officer.destroy({ where: { id } });
        } catch (error) {
            console.error("Error deleting officer:", error);
            throw error;
        }
    }
    public async findByDepartmentId(dep_id: number): Promise<Officer[]> {
        try {
            return Officer.findAll({ where: { dep_id } });
        } catch (error) {
            console.error("Error finding officers by department ID:", error);
            throw error;
        }
    }
    public async findByUserId(user_id: number): Promise<Officer[]> {
        try {
            return Officer.findAll({ where: { user_id } });
        } catch (error) {
            console.error("Error finding officers by user ID:", error);
            throw error;
        }
    }

}