import type { Registration } from '../../domain/entities/Registration';
import type { Patient } from '../../domain/entities/Patient';

export interface DashboardStatsDTO {
  totalPatients: number;
  totalVaccinations: number;
  todayQueue: number;
  certificatesIssued: number;
  recentRegistrations: any[];
}

export interface IDashboardRepository {
  getStats(): Promise<DashboardStatsDTO>;
}
