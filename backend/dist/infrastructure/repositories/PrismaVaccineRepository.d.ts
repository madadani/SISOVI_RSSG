import type { IVaccineRepository } from '../../domain/repositories/IVaccineRepository';
import type { Vaccine } from '../../domain/entities/Vaccine';
import type { PrismaClient } from '@prisma/client';
export declare class PrismaVaccineRepository implements IVaccineRepository {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    findAllActive(): Promise<Vaccine[]>;
    findById(id: string): Promise<Vaccine | null>;
    update(id: string, data: Partial<Vaccine>): Promise<Vaccine>;
}
//# sourceMappingURL=PrismaVaccineRepository.d.ts.map