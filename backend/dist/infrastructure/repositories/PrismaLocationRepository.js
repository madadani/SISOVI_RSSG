"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaLocationRepository = void 0;
class PrismaLocationRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAllActive() {
        return this.prisma.location.findMany({
            where: { isActive: true },
        });
    }
    async findById(id) {
        return this.prisma.location.findUnique({
            where: { id },
        });
    }
}
exports.PrismaLocationRepository = PrismaLocationRepository;
//# sourceMappingURL=PrismaLocationRepository.js.map