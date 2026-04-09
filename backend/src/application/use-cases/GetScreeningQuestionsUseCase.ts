import type { IScreeningQuestionRepository } from '../../domain/repositories/IScreeningQuestionRepository';
import type { ScreeningQuestion } from '../../domain/entities/ScreeningQuestion';

export class GetScreeningQuestionsUseCase {
  constructor(private readonly questionRepository: IScreeningQuestionRepository) {}

  async execute(): Promise<ScreeningQuestion[]> {
    return this.questionRepository.findAllActive();
  }
}
