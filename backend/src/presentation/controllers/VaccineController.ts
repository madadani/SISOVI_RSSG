import type { Request, Response } from 'express';
import type { GetVaccinesUseCase } from '../../application/use-cases/GetVaccinesUseCase';
import type { UpdateVaccineUseCase } from '../../application/use-cases/UpdateVaccineUseCase';

export class VaccineController {
  constructor(
    private readonly getVaccinesUseCase: GetVaccinesUseCase,
    private readonly updateVaccineUseCase: UpdateVaccineUseCase
  ) {}

  async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const vaccines = await this.getVaccinesUseCase.execute();
      res.json(vaccines);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch vaccines' });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const data = req.body;
      const updated = await this.updateVaccineUseCase.execute(id as string, data);
      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update vaccine' });
    }
  }
}
