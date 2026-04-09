import { Router } from 'express';
import type { RegistrationController } from '../controllers/RegistrationController';

export function createRegistrationRoutes(controller: RegistrationController): Router {
  const router = Router();
  router.post('/', (req, res) => controller.register(req, res));
  return router;
}
