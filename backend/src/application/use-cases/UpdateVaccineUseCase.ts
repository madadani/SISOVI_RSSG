import type { IVaccineRepository } from '../../domain/repositories/IVaccineRepository';
import type { Vaccine } from '../../domain/entities/Vaccine';

export class UpdateVaccineUseCase {
  constructor(private readonly vaccineRepository: IVaccineRepository) {}

  async execute(id: string, data: Partial<Vaccine>): Promise<Vaccine> {
    const vaccine = await this.vaccineRepository.findById(id);
    if (!vaccine) {
      throw new Error('Vaccine not found');
    }
    return this.vaccineRepository.update(id, data);
  }
}
