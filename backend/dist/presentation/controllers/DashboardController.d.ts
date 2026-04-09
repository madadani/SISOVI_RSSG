import type { Request, Response } from 'express';
import type { GetDashboardStatsUseCase } from '../../application/use-cases/GetDashboardStatsUseCase';
export declare class DashboardController {
    private readonly getDashboardStatsUseCase;
    constructor(getDashboardStatsUseCase: GetDashboardStatsUseCase);
    getStats(_req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=DashboardController.d.ts.map