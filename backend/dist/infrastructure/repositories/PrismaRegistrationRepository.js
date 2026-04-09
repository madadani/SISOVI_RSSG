"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaRegistrationRepository = void 0;
class PrismaRegistrationRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
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
        return reg;
    }
    async findById(id) {
        const reg = await this.prisma.registration.findUnique({
            where: { id },
        });
        return reg;
    }
    async findByPatientId(patientId) {
        const regs = await this.prisma.registration.findMany({
            where: { patientId },
        });
        return regs;
    }
    async countAll() {
        return this.prisma.registration.count();
    }
    async countByDate(date) {
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
    async findRecent(limit) {
        const regs = await this.prisma.registration.findMany({
            take: limit,
            orderBy: { createdAt: 'desc' },
            include: {
                patient: true,
            },
        });
        return regs;
    }
    async findByQueueNumber(queueNumber) {
        const reg = await this.prisma.registration.findUnique({
            where: { queueNumber },
            include: {
                patient: true,
                documents: true,
            },
        });
        return reg;
    }
}
exports.PrismaRegistrationRepository = PrismaRegistrationRepository;
//# sourceMappingURL=PrismaRegistrationRepository.js.map