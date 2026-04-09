import type { Request, Response } from 'express';
import type { GetLocationsUseCase } from '../../application/use-cases/GetLocationsUseCase';

export class LocationController {
  constructor(private readonly getLocationsUseCase: GetLocationsUseCase) {}

  async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const locations = await this.getLocationsUseCase.execute();
      res.json(locations);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch locations' });
    }
  }
}
