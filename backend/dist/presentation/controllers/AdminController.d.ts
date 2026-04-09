import type { Request, Response } from 'express';
export declare class AdminController {
    getPatients(_req: Request, res: Response): Promise<void>;
    getQueues(req: Request, res: Response): Promise<void>;
    setQueueStatus(req: Request, res: Response): Promise<void>;
    getCertificates(_req: Request, res: Response): Promise<void>;
    deletePatient(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=AdminController.d.ts.map