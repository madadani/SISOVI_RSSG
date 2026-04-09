"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaScreeningQuestionRepository = void 0;
class PrismaScreeningQuestionRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAllActive() {
        return this.prisma.screeningQuestion.findMany({
            where: { isActive: true },
        });
    }
    async findById(id) {
        return this.prisma.screeningQuestion.findUnique({
            where: { id },
        });
    }
}
exports.PrismaScreeningQuestionRepository = PrismaScreeningQuestionRepository;
//# sourceMappingURL=PrismaScreeningQuestionRepository.js.map