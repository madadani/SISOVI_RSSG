import type { IScreeningQuestionRepository } from '../../domain/repositories/IScreeningQuestionRepository';
import type { ScreeningQuestion } from '../../domain/entities/ScreeningQuestion';
export declare class GetScreeningQuestionsUseCase {
    private readonly questionRepository;
    constructor(questionRepository: IScreeningQuestionRepository);
    execute(): Promise<ScreeningQuestion[]>;
}
//# sourceMappingURL=GetScreeningQuestionsUseCase.d.ts.map