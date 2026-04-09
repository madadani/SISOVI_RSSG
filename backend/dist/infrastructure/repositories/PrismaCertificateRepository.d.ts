import type { ICertificateRepository, Certificate } from '../../domain/repositories/ICertificateRepository';
import type { PrismaClient } from '@prisma/client';
export declare class PrismaCertificateRepository implements ICertificateRepository {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    findByPatientNikAndDob(nik: string, dob: Date): Promise<Certificate[]>;
    findById(id: string): Promise<Certificate | null>;
}
//# sourceMappingURL=PrismaCertificateRepository.d.ts.map