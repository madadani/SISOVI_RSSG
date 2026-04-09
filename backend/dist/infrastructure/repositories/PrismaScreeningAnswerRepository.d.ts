import type { IScreeningAnswerRepository, CreateScreeningAnswerData } from '../../domain/repositories/IScreeningAnswerRepository';
import type { ScreeningAnswer } from '../../domain/entities/ScreeningAnswer';
import type { PrismaClient } from '@prisma/client';
export declare class PrismaScreeningAnswerRepository implements IScreeningAnswerRepository {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    createMany(data: CreateScreeningAnswerData[]): Promise<number>;
    findByRegistrationId(registrationId: string): Promise<ScreeningAnswer[]>;
}
//# sourceMappingURL=PrismaScreeningAnswerRepository.d.ts.map