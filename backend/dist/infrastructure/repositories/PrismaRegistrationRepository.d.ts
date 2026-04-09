import type { IRegistrationRepository, CreateRegistrationData, RegistrationWithPatient } from '../../domain/repositories/IRegistrationRepository';
import type { Registration } from '../../domain/entities/Registration';
import type { PrismaClient } from '@prisma/client';
export declare class PrismaRegistrationRepository implements IRegistrationRepository {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    create(data: CreateRegistrationData): Promise<Registration>;
    findById(id: string): Promise<Registration | null>;
    findByPatientId(patientId: string): Promise<Registration[]>;
    countAll(): Promise<number>;
    countByDate(date: Date): Promise<number>;
    findRecent(limit: number): Promise<RegistrationWithPatient[]>;
    findByQueueNumber(queueNumber: string): Promise<RegistrationWithPatient | null>;
}
//# sourceMappingURL=PrismaRegistrationRepository.d.ts.map