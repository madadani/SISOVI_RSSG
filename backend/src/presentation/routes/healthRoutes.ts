import { Router } from 'express';
import type { HealthController } from '../controllers/HealthController';

export function createHealthRoutes(controller: HealthController): Router {
  const router = Router();
  router.get('/health', (req, res) => controller.check(req, res));
  return router;
}
