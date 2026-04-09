import type { IVaccineRepository } from '../../domain/repositories/IVaccineRepository';
import type { Vaccine } from '../../domain/entities/Vaccine';
import type { PrismaClient } from '@prisma/client';

export class PrismaVaccineRepository implements IVaccineRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAllActive(): Promise<Vaccine[]> {
    return this.prisma.vaccine.findMany({
      where: { isActive: true },
    });
  }

  async findById(id: string): Promise<Vaccine | null> {
    return this.prisma.vaccine.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: Partial<Vaccine>): Promise<Vaccine> {
    return this.prisma.vaccine.update({
      where: { id },
      data,
    });
  }
}
