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
//# sourceMappingURL=IDashboardRepository.d.ts.map