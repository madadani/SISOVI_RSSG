import type { Vaccine } from '../entities/Vaccine';
export interface IVaccineRepository {
    findAll(): Promise<Vaccine[]>;
    findAllActive(): Promise<Vaccine[]>;
    findById(id: string): Promise<Vaccine | null>;
    update(id: string, data: Partial<Vaccine>): Promise<Vaccine>;
    delete(id: string): Promise<void>;
}
//# sourceMappingURL=IVaccineRepository.d.ts.map