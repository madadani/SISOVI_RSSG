import { Router } from 'express';
import type { LocationController } from '../controllers/LocationController';

export function createLocationRoutes(controller: LocationController): Router {
  const router = Router();
  router.get('/', (req, res) => controller.getAll(req, res));
  return router;
}
