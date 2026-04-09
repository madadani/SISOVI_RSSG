import type { IPatientRepository } from '../../domain/repositories/IPatientRepository';
import type { Patient } from '../../domain/entities/Patient';
import type { PrismaClient } from '@prisma/client';

export class PrismaPatientRepository implements IPatientRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findByNik(nik: string): Promise<Patient | null> {
    return this.prisma.patient.findUnique({
      where: { nik },
    });
  }

  async findById(id: string): Promise<Patient | null> {
    return this.prisma.patient.findUnique({
      where: { id },
    });
  }

  async create(data: Omit<Patient, 'id'>): Promise<Patient> {
    return this.prisma.patient.create({ data });
  }

  async update(id: string, data: Partial<Patient>): Promise<Patient> {
    return this.prisma.patient.update({
      where: { id },
      data,
    });
  }

  async countAll(): Promise<number> {
    return this.prisma.patient.count();
  }
}
