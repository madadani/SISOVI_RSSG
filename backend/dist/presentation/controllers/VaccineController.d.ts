import type { Request, Response } from 'express';
import type { GetVaccinesUseCase } from '../../application/use-cases/GetVaccinesUseCase';
import type { UpdateVaccineUseCase } from '../../application/use-cases/UpdateVaccineUseCase';
import type { IVaccineRepository } from '../../domain/repositories/IVaccineRepository';
export declare class VaccineController {
    private readonly getVaccinesUseCase;
    private readonly updateVaccineUseCase;
    private readonly vaccineRepo?;
    constructor(getVaccinesUseCase: GetVaccinesUseCase, updateVaccineUseCase: UpdateVaccineUseCase, vaccineRepo?: IVaccineRepository | undefined);
    getAll(_req: Request, res: Response): Promise<void>;
    getAllForAdmin(_req: Request, res: Response): Promise<void>;
    update(req: Request, res: Response): Promise<void>;
    delete(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=VaccineController.d.ts.map