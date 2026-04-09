import type { Request, Response } from 'express';

export class HealthController {
  check(_req: Request, res: Response): void {
    res.json({
      status: 'OK',
      message: 'SISOV-RSSG Backend is running',
      timestamp: new Date().toISOString(),
    });
  }
}
