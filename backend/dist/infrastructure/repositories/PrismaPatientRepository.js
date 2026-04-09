"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaPatientRepository = void 0;
class PrismaPatientRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findByNik(nik) {
        return this.prisma.patient.findUnique({
            where: { nik },
        });
    }
    async findById(id) {
        return this.prisma.patient.findUnique({
            where: { id },
        });
    }
    async create(data) {
        return this.prisma.patient.create({ data });
    }
    async update(id, data) {
        return this.prisma.patient.update({
            where: { id },
            data,
        });
    }
    async countAll() {
        return this.prisma.patient.count();
    }
}
exports.PrismaPatientRepository = PrismaPatientRepository;
//# sourceMappingURL=PrismaPatientRepository.js.map