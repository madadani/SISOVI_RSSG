import type { Request, Response } from 'express';
import type { GetDashboardStatsUseCase } from '../../application/use-cases/GetDashboardStatsUseCase';

export class DashboardController {
  constructor(private readonly getDashboardStatsUseCase: GetDashboardStatsUseCase) {}

  async getStats(_req: Request, res: Response): Promise<void> {
    try {
      const stats = await this.getDashboardStatsUseCase.execute();
      res.json(stats);
    } catch (error) {
      // Keep the response generic, but log details for debugging.
      console.error('[DashboardController] Failed to fetch dashboard stats:', error);
      res.status(500).json({ error: 'Failed to fetch dashboard stats' });
    }
  }
}
