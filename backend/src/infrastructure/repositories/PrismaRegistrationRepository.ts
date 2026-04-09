import type { IRegistrationRepository, CreateRegistrationData, RegistrationWithPatient } from '../../domain/repositories/IRegistrationRepository';
import type { Registration } from '../../domain/entities/Registration';
import type { PrismaClient } from '@prisma/client';

export class PrismaRegistrationRepository implements IRegistrationRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(data: CreateRegistrationData): Promise<Registration> {
    const reg = await this.prisma.registration.create({
      data: {
        patientId: data.patientId,
        vaccineIds: data.vaccineIds,
        locationId: data.locationId,
        scheduleDate: data.scheduleDate,
        scheduleTime: data.scheduleTime,
        queueNumber: data.queueNumber,
        passportNumber: data.passportNumber,
        namePassport1: data.namePassport1,
        namePassport4: data.namePassport4,
        destinationCountry: data.destinationCountry,
        serviceType: data.serviceType,
        departureDate: data.departureDate,
      },
    });
    return reg as unknown as Registration;
  }

  async findById(id: string): Promise<Registration | null> {
    const reg = await this.prisma.registration.findUnique({
      where: { id },
    });
    return reg as unknown as Registration | null;
  }

  async findByPatientId(patientId: string): Promise<Registration[]> {
    const regs = await this.prisma.registration.findMany({
      where: { patientId },
    });
    return regs as unknown as Registration[];
  }

  async countAll(): Promise<number> {
    return this.prisma.registration.count();
  }

  async countByDate(date: Date): Promise<number> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    return this.prisma.registration.count({
      where: {
        scheduleDate: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });
  }

  async findRecent(limit: number): Promise<RegistrationWithPatient[]> {
    const regs = await this.prisma.registration.findMany({
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        patient: true,
      },
    });
    return regs as unknown as RegistrationWithPatient[];
  }

  async findByQueueNumber(queueNumber: string): Promise<RegistrationWithPatient | null> {
    const reg = await this.prisma.registration.findUnique({
      where: { queueNumber },
      include: {
        patient: true,
        documents: true,
      },
    });
    return reg as unknown as RegistrationWithPatient | null;
  }
}
