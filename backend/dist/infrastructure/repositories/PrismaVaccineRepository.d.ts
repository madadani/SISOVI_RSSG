import type { IVaccineRepository } from '../../domain/repositories/IVaccineRepository';
import type { Vaccine } from '../../domain/entities/Vaccine';
import type { PrismaClient } from '@prisma/client';
export declare class PrismaVaccineRepository implements IVaccineRepository {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    findAll(): Promise<Vaccine[]>;
    findAllActive(): Promise<Vaccine[]>;
    findById(id: string): Promise<Vaccine | null>;
    update(id: string, data: Partial<Vaccine>): Promise<Vaccine>;
    delete(id: string): Promise<void>;
}
//# sourceMappingURL=PrismaVaccineRepository.d.ts.map