import type { ILocationRepository } from '../../domain/repositories/ILocationRepository';
import type { Location } from '../../domain/entities/Location';
export declare class GetLocationsUseCase {
    private readonly locationRepository;
    constructor(locationRepository: ILocationRepository);
    execute(): Promise<Location[]>;
}
//# sourceMappingURL=GetLocationsUseCase.d.ts.map