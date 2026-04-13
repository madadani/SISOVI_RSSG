"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaVaccineRepository = void 0;
class PrismaVaccineRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.vaccine.findMany();
    }
    async findAllActive() {
        return this.prisma.vaccine.findMany({
            where: { isActive: true },
        });
    }
    async findById(id) {
        return this.prisma.vaccine.findUnique({
            where: { id },
        });
    }
    async update(id, data) {
        return this.prisma.vaccine.update({
            where: { id },
            data,
        });
    }
    async delete(id) {
        await this.prisma.vaccine.delete({
            where: { id },
        });
    }
}
exports.PrismaVaccineRepository = PrismaVaccineRepository;
//# sourceMappingURL=PrismaVaccineRepository.js.map