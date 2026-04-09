import { Router } from 'express';
import type { VaccineController } from '../controllers/VaccineController';

export function createVaccineRoutes(controller: VaccineController): Router {
  const router = Router();
  router.get('/', (req, res) => controller.getAll(req, res));
  router.put('/:id', (req, res) => controller.update(req, res));
  return router;
}
