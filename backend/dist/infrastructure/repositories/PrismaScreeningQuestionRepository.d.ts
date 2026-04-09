import type { IScreeningQuestionRepository } from '../../domain/repositories/IScreeningQuestionRepository';
import type { ScreeningQuestion } from '../../domain/entities/ScreeningQuestion';
import type { PrismaClient } from '@prisma/client';
export declare class PrismaScreeningQuestionRepository implements IScreeningQuestionRepository {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    findAllActive(): Promise<ScreeningQuestion[]>;
    findById(id: string): Promise<ScreeningQuestion | null>;
}
//# sourceMappingURL=PrismaScreeningQuestionRepository.d.ts.map