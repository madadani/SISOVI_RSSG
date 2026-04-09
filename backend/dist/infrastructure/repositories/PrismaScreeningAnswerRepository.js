"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaScreeningAnswerRepository = void 0;
class PrismaScreeningAnswerRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createMany(data) {
        const result = await this.prisma.screeningAnswer.createMany({ data });
        return result.count;
    }
    async findByRegistrationId(registrationId) {
        return this.prisma.screeningAnswer.findMany({
            where: { registrationId },
        });
    }
}
exports.PrismaScreeningAnswerRepository = PrismaScreeningAnswerRepository;
//# sourceMappingURL=PrismaScreeningAnswerRepository.js.map