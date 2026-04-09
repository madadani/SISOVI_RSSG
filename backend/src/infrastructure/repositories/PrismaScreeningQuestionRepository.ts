import type { IScreeningQuestionRepository } from '../../domain/repositories/IScreeningQuestionRepository';
import type { ScreeningQuestion } from '../../domain/entities/ScreeningQuestion';
import type { PrismaClient } from '@prisma/client';

export class PrismaScreeningQuestionRepository implements IScreeningQuestionRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAllActive(): Promise<ScreeningQuestion[]> {
    return this.prisma.screeningQuestion.findMany({
      where: { isActive: true },
    });
  }

  async findById(id: string): Promise<ScreeningQuestion | null> {
    return this.prisma.screeningQuestion.findUnique({
      where: { id },
    });
  }
}
