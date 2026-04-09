import type { Request, Response } from 'express';
import type { GetScreeningQuestionsUseCase } from '../../application/use-cases/GetScreeningQuestionsUseCase';
export declare class ScreeningQuestionController {
    private readonly getQuestionsUseCase;
    constructor(getQuestionsUseCase: GetScreeningQuestionsUseCase);
    getAll(_req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=ScreeningQuestionController.d.ts.map