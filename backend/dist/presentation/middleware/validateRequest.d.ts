import type { Request, Response, NextFunction } from 'express';
import type { ZodSchema } from 'zod';
export declare function validateRequest(schema: ZodSchema): (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=validateRequest.d.ts.map