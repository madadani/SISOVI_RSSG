import type { Request, Response } from 'express';
import type { GetVaccinesUseCase } from '../../application/use-cases/GetVaccinesUseCase';
import type { UpdateVaccineUseCase } from '../../application/use-cases/UpdateVaccineUseCase';
export declare class VaccineController {
    private readonly getVaccinesUseCase;
    private readonly updateVaccineUseCase;
    constructor(getVaccinesUseCase: GetVaccinesUseCase, updateVaccineUseCase: UpdateVaccineUseCase);
    getAll(_req: Request, res: Response): Promise<void>;
    update(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=VaccineController.d.ts.map