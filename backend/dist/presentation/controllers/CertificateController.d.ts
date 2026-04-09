import type { Request, Response } from 'express';
import type { GetCertificatesUseCase } from '../../application/use-cases/GetCertificatesUseCase';
export declare class CertificateController {
    private readonly getCertificatesUseCase;
    constructor(getCertificatesUseCase: GetCertificatesUseCase);
    getByPatient(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=CertificateController.d.ts.map