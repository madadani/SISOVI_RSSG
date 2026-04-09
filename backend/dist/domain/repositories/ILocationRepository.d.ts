import type { Location } from '../entities/Location';
export interface ILocationRepository {
    findAllActive(): Promise<Location[]>;
    findById(id: string): Promise<Location | null>;
}
//# sourceMappingURL=ILocationRepository.d.ts.map