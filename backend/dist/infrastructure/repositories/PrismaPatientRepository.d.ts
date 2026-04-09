import type { IPatientRepository } from '../../domain/repositories/IPatientRepository';
import type { Patient } from '../../domain/entities/Patient';
import type { PrismaClient } from '@prisma/client';
export declare class PrismaPatientRepository implements IPatientRepository {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    findByNik(nik: string): Promise<Patient | null>;
    findById(id: string): Promise<Patient | null>;
    create(data: Omit<Patient, 'id'>): Promise<Patient>;
    update(id: string, data: Partial<Patient>): Promise<Patient>;
    countAll(): Promise<number>;
}
//# sourceMappingURL=PrismaPatientRepository.d.ts.map