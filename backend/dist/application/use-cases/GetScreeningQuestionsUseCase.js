"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetScreeningQuestionsUseCase = void 0;
class GetScreeningQuestionsUseCase {
    constructor(questionRepository) {
        this.questionRepository = questionRepository;
    }
    async execute() {
        return this.questionRepository.findAllActive();
    }
}
exports.GetScreeningQuestionsUseCase = GetScreeningQuestionsUseCase;
//# sourceMappingURL=GetScreeningQuestionsUseCase.js.map