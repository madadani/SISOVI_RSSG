import type { IRegistrationRepository } from '../../domain/repositories/IRegistrationRepository';
import type { IVaccineRepository } from '../../domain/repositories/IVaccineRepository';
import type { IPatientRepository } from '../../domain/repositories/IPatientRepository';
import prisma from '../../infrastructure/database/prisma';

export interface DashboardStatsDTO {
  totalPatients: number;
  totalVaccinations: number;
  todayQueue: number;
  certificatesIssued: number;
  recentRegistrations: any[];
}

export class GetDashboardStatsUseCase {
  constructor(
    private readonly registrationRepository: IRegistrationRepository,
    private readonly vaccineRepository: IVaccineRepository,
    private readonly patientRepository: IPatientRepository,
  ) {}

  async execute(): Promise<DashboardStatsDTO> {
    const [totalPatients, totalVaccinations, todayQueue, certificatesCount, recentRegs] = await Promise.all([
      this.patientRepository.countAll(),
      this.registrationRepository.countAll(),
      this.registrationRepository.countByDate(new Date()),
      prisma.certificate.count(), // Using prisma directly for minor counts not yet in repos
      this.registrationRepository.findRecent(5)
    ]);

    // Map recent registrations to frontend friendly format
    const formattedRegs = recentRegs.map(reg => ({
      id: reg.id,
      name: reg.patient.name,
      vaccine: 'Vaksinasi', // In a real app, join with vaccine name
      time: reg.scheduleTime,
      status: reg.status
    }));

    return {
      totalPatients,
      totalVaccinations,
      todayQueue,
      certificatesIssued: certificatesCount,
      recentRegistrations: formattedRegs
    };
  }
}
