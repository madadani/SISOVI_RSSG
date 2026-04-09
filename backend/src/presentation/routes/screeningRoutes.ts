import { Router } from 'express';
import type { ScreeningQuestionController } from '../controllers/ScreeningQuestionController';

export function createScreeningRoutes(controller: ScreeningQuestionController): Router {
  const router = Router();
  router.get('/', (req, res) => controller.getAll(req, res));
  return router;
}
