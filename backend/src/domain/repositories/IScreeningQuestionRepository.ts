import type { ScreeningQuestion } from '../entities/ScreeningQuestion';

export interface IScreeningQuestionRepository {
  findAllActive(): Promise<ScreeningQuestion[]>;
  findById(id: string): Promise<ScreeningQuestion | null>;
}
