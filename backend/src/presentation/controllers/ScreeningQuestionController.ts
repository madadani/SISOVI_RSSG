import type { Request, Response } from 'express';
import type { GetScreeningQuestionsUseCase } from '../../application/use-cases/GetScreeningQuestionsUseCase';

export class ScreeningQuestionController {
  constructor(private readonly getQuestionsUseCase: GetScreeningQuestionsUseCase) {}

  async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const questions = await this.getQuestionsUseCase.execute();
      res.json(questions);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch questions' });
    }
  }
}
