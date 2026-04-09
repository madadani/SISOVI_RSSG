import type { IScreeningAnswerRepository, CreateScreeningAnswerData } from '../../domain/repositories/IScreeningAnswerRepository';
import type { ScreeningAnswer } from '../../domain/entities/ScreeningAnswer';
import type { PrismaClient } from '@prisma/client';

export class PrismaScreeningAnswerRepository implements IScreeningAnswerRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async createMany(data: CreateScreeningAnswerData[]): Promise<number> {
    const result = await this.prisma.screeningAnswer.createMany({ data });
    return result.count;
  }

  async findByRegistrationId(registrationId: string): Promise<ScreeningAnswer[]> {
    return this.prisma.screeningAnswer.findMany({
      where: { registrationId },
    });
  }
}
