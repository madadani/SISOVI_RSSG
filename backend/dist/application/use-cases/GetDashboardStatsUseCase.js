"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetDashboardStatsUseCase = void 0;
const prisma_1 = __importDefault(require("../../infrastructure/database/prisma"));
class GetDashboardStatsUseCase {
    constructor(registrationRepository, vaccineRepository, patientRepository) {
        this.registrationRepository = registrationRepository;
        this.vaccineRepository = vaccineRepository;
        this.patientRepository = patientRepository;
    }
    async execute() {
        const [totalPatients, totalVaccinations, todayQueue, certificatesCount, recentRegs] = await Promise.all([
            this.patientRepository.countAll(),
            this.registrationRepository.countAll(),
            this.registrationRepository.countByDate(new Date()),
            prisma_1.default.certificate.count(), // Using prisma directly for minor counts not yet in repos
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
exports.GetDashboardStatsUseCase = GetDashboardStatsUseCase;
//# sourceMappingURL=GetDashboardStatsUseCase.js.map