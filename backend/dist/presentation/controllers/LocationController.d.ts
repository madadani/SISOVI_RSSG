import type { Request, Response } from 'express';
import type { GetLocationsUseCase } from '../../application/use-cases/GetLocationsUseCase';
export declare class LocationController {
    private readonly getLocationsUseCase;
    constructor(getLocationsUseCase: GetLocationsUseCase);
    getAll(_req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=LocationController.d.ts.map