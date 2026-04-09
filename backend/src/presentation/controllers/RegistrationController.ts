import type { Request, Response } from 'express';
import type { RegisterPatientUseCase } from '../../application/use-cases/RegisterPatientUseCase';
import type { GetRegistrationStatusUseCase } from '../../application/use-cases/GetRegistrationStatusUseCase';
import type { RegisterPatientDTO } from '../../application/dtos/RegisterPatientDTO';

export class RegistrationController {
  constructor(
    private readonly registerPatientUseCase: RegisterPatientUseCase,
    private readonly getRegistrationStatusUseCase: GetRegistrationStatusUseCase
  ) {}

  async register(req: Request, res: Response): Promise<void> {
    try {
      const dto = req.body as RegisterPatientDTO;
      const result = await this.registerPatientUseCase.execute(dto);
      res.json(result);
    } catch (error: any) {
      console.error('Registration controller error:', error);
      res.status(500).json({ error: error.message || 'Failed to register' });
    }
  }

  async getStatus(req: Request, res: Response): Promise<void> {
    try {
      const { queueNumber } = req.query;
      if (!queueNumber) {
        res.status(400).json({ error: 'Queue number is required' });
        return;
      }
      const result = await this.getRegistrationStatusUseCase.execute(queueNumber as string);
      if (!result) {
        res.status(404).json({ error: 'Registration not found' });
        return;
      }
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch status' });
    }
  }
}
