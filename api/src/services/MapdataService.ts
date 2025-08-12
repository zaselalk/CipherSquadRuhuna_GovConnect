import { MapdataRepository } from "../repositories/MapdataRepository";


export class MapdataService {
    private mapdataRepository: MapdataRepository;

    constructor(mapdataRepository: MapdataRepository) {
        this.mapdataRepository = mapdataRepository;
    }

    async getAllHouseLocations(): Promise<any[]> {
        return this.mapdataRepository.getAllHoouseLocation();
    }
}