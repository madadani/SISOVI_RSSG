"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScreeningQuestionController = void 0;
class ScreeningQuestionController {
    constructor(getQuestionsUseCase) {
        this.getQuestionsUseCase = getQuestionsUseCase;
    }
    async getAll(_req, res) {
        try {
            const questions = await this.getQuestionsUseCase.execute();
            res.json(questions);
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to fetch questions' });
        }
    }
}
exports.ScreeningQuestionController = ScreeningQuestionController;
//# sourceMappingURL=ScreeningQuestionController.js.map