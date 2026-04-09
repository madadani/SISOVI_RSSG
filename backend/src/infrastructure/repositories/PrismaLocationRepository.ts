import type { ILocationRepository } from '../../domain/repositories/ILocationRepository';
import type { Location } from '../../domain/entities/Location';
import type { PrismaClient } from '@prisma/client';

export class PrismaLocationRepository implements ILocationRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAllActive(): Promise<Location[]> {
    return this.prisma.location.findMany({
      where: { isActive: true },
    });
  }

  async findById(id: string): Promise<Location | null> {
    return this.prisma.location.findUnique({
      where: { id },
    });
  }
}
