import type { Request, Response } from 'express';
import type { RegisterPatientUseCase } from '../../application/use-cases/RegisterPatientUseCase';
import type { GetRegistrationStatusUseCase } from '../../application/use-cases/GetRegistrationStatusUseCase';
export declare class RegistrationController {
    private readonly registerPatientUseCase;
    private readonly getRegistrationStatusUseCase;
    constructor(registerPatientUseCase: RegisterPatientUseCase, getRegistrationStatusUseCase: GetRegistrationStatusUseCase);
    register(req: Request, res: Response): Promise<void>;
    getStatus(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=RegistrationController.d.ts.map