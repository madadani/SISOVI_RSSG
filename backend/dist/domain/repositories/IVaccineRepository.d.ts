import type { Vaccine } from '../entities/Vaccine';
export interface IVaccineRepository {
    findAllActive(): Promise<Vaccine[]>;
    findById(id: string): Promise<Vaccine | null>;
    update(id: string, data: Partial<Vaccine>): Promise<Vaccine>;
}
//# sourceMappingURL=IVaccineRepository.d.ts.map