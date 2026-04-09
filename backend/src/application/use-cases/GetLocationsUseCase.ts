import type { ILocationRepository } from '../../domain/repositories/ILocationRepository';
import type { Location } from '../../domain/entities/Location';

export class GetLocationsUseCase {
  constructor(private readonly locationRepository: ILocationRepository) {}

  async execute(): Promise<Location[]> {
    return this.locationRepository.findAllActive();
  }
}
