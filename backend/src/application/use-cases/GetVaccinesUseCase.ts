import type { IVaccineRepository } from '../../domain/repositories/IVaccineRepository';
import type { Vaccine } from '../../domain/entities/Vaccine';

export class GetVaccinesUseCase {
  constructor(private readonly vaccineRepository: IVaccineRepository) {}

  async execute(): Promise<Vaccine[]> {
    return this.vaccineRepository.findAllActive();
  }
}
