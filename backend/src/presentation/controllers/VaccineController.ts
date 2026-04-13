import type { Request, Response } from 'express';
import type { GetVaccinesUseCase } from '../../application/use-cases/GetVaccinesUseCase';
import type { UpdateVaccineUseCase } from '../../application/use-cases/UpdateVaccineUseCase';
import type { IVaccineRepository } from '../../domain/repositories/IVaccineRepository';

export class VaccineController {
  constructor(
    private readonly getVaccinesUseCase: GetVaccinesUseCase,
    private readonly updateVaccineUseCase: UpdateVaccineUseCase,
    private readonly vaccineRepo?: IVaccineRepository
  ) {}

  async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const vaccines = await this.getVaccinesUseCase.execute();
      res.json(vaccines);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch vaccines' });
    }
  }

  async getAllForAdmin(_req: Request, res: Response): Promise<void> {
    try {
      if (this.vaccineRepo) {
        const vaccines = await this.vaccineRepo.findAll();
        res.json(vaccines);
      } else {
        const vaccines = await this.getVaccinesUseCase.execute();
        res.json(vaccines);
      }
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

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (this.vaccineRepo) {
        await this.vaccineRepo.delete(id as string);
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete vaccine' });
    }
  }
}
