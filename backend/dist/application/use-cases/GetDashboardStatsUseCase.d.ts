import type { IRegistrationRepository } from '../../domain/repositories/IRegistrationRepository';
import type { IVaccineRepository } from '../../domain/repositories/IVaccineRepository';
import type { IPatientRepository } from '../../domain/repositories/IPatientRepository';
export interface DashboardStatsDTO {
    totalPatients: number;
    totalVaccinations: number;
    todayQueue: number;
    certificatesIssued: number;
    recentRegistrations: any[];
}
export declare class GetDashboardStatsUseCase {
    private readonly registrationRepository;
    private readonly vaccineRepository;
    private readonly patientRepository;
    constructor(registrationRepository: IRegistrationRepository, vaccineRepository: IVaccineRepository, patientRepository: IPatientRepository);
    execute(): Promise<DashboardStatsDTO>;
}
//# sourceMappingURL=GetDashboardStatsUseCase.d.ts.map