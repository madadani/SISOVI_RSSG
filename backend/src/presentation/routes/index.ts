import { Router } from 'express';

// Use Cases
import { GetLocationsUseCase } from '../../application/use-cases/GetLocationsUseCase';
import { GetVaccinesUseCase } from '../../application/use-cases/GetVaccinesUseCase';
import { UpdateVaccineUseCase } from '../../application/use-cases/UpdateVaccineUseCase';
import { GetScreeningQuestionsUseCase } from '../../application/use-cases/GetScreeningQuestionsUseCase';
import { RegisterPatientUseCase } from '../../application/use-cases/RegisterPatientUseCase';
import { GetDashboardStatsUseCase } from '../../application/use-cases/GetDashboardStatsUseCase';
import { GetCertificatesUseCase } from '../../application/use-cases/GetCertificatesUseCase';
import { GetRegistrationStatusUseCase } from '../../application/use-cases/GetRegistrationStatusUseCase';

// Infrastructure Repositories
import { PrismaLocationRepository } from '../../infrastructure/repositories/PrismaLocationRepository';
import { PrismaVaccineRepository } from '../../infrastructure/repositories/PrismaVaccineRepository';
import { PrismaScreeningQuestionRepository } from '../../infrastructure/repositories/PrismaScreeningQuestionRepository';
import { PrismaPatientRepository } from '../../infrastructure/repositories/PrismaPatientRepository';
import { PrismaRegistrationRepository } from '../../infrastructure/repositories/PrismaRegistrationRepository';
import { PrismaScreeningAnswerRepository } from '../../infrastructure/repositories/PrismaScreeningAnswerRepository';
import { PrismaCertificateRepository } from '../../infrastructure/repositories/PrismaCertificateRepository';

// Controllers
import { HealthController } from '../controllers/HealthController';
import { LocationController } from '../controllers/LocationController';
import { VaccineController } from '../controllers/VaccineController';
import { ScreeningQuestionController } from '../controllers/ScreeningQuestionController';
import { RegistrationController } from '../controllers/RegistrationController';
import { DashboardController } from '../controllers/DashboardController';
import { CertificateController } from '../controllers/CertificateController';
import { AdminController } from '../controllers/AdminController';

// Route creators
import { createHealthRoutes } from './healthRoutes';
import { createLocationRoutes } from './locationRoutes';
import { createVaccineRoutes } from './vaccineRoutes';
import { createScreeningRoutes } from './screeningRoutes';
import { createRegistrationRoutes } from './registrationRoutes';

// Prisma client
import prisma from '../../infrastructure/database/prisma';

export function createRouter(): Router {
  const router = Router();

  // ── Repositories (Infrastructure) ─────────────────────────
  const locationRepo = new PrismaLocationRepository(prisma);
  const vaccineRepo = new PrismaVaccineRepository(prisma);
  const questionRepo = new PrismaScreeningQuestionRepository(prisma);
  const patientRepo = new PrismaPatientRepository(prisma);
  const registrationRepo = new PrismaRegistrationRepository(prisma);
  const answerRepo = new PrismaScreeningAnswerRepository(prisma);
  const certificateRepo = new PrismaCertificateRepository(prisma);

  // ── Use Cases (Application) ───────────────────────────────
  const getLocationsUC = new GetLocationsUseCase(locationRepo);
  const getVaccinesUC = new GetVaccinesUseCase(vaccineRepo);
  const updateVaccineUC = new UpdateVaccineUseCase(vaccineRepo);
  const getQuestionsUC = new GetScreeningQuestionsUseCase(questionRepo);
  const registerPatientUC = new RegisterPatientUseCase(patientRepo, registrationRepo, answerRepo);
  const getDashboardStatsUC = new GetDashboardStatsUseCase(registrationRepo, vaccineRepo, patientRepo);
  const getCertificatesUC = new GetCertificatesUseCase(certificateRepo);
  const getRegistrationStatusUC = new GetRegistrationStatusUseCase(registrationRepo);

  // ── Controllers (Presentation) ────────────────────────────
  const healthCtrl = new HealthController();
  const locationCtrl = new LocationController(getLocationsUC);
  const vaccineCtrl = new VaccineController(getVaccinesUC, updateVaccineUC);
  const questionCtrl = new ScreeningQuestionController(getQuestionsUC);
  const registrationCtrl = new RegistrationController(registerPatientUC, getRegistrationStatusUC);
  const dashboardCtrl = new DashboardController(getDashboardStatsUC);
  const certificateCtrl = new CertificateController(getCertificatesUC);
  const adminCtrl = new AdminController();

  // ── Mount Routes ──────────────────────────────────────────
  router.use(createHealthRoutes(healthCtrl));
  router.use('/api/locations', createLocationRoutes(locationCtrl));
  router.use('/api/vaccines', createVaccineRoutes(vaccineCtrl));
  router.use('/api/questions', createScreeningRoutes(questionCtrl));
  router.use('/api/register', createRegistrationRoutes(registrationCtrl));
  router.get('/api/registration/status', (req, res) => registrationCtrl.getStatus(req, res));
  router.get('/api/dashboard', (req, res) => dashboardCtrl.getStats(req, res));
  router.get('/api/certificates', (req, res) => certificateCtrl.getByPatient(req, res));
  
  // Admin Routes
  router.get('/api/admin/patients', (req, res) => adminCtrl.getPatients(req, res));
  router.get('/api/admin/queues', (req, res) => adminCtrl.getQueues(req, res));
  router.put('/api/admin/queues/:queueNumber/status', (req, res) => adminCtrl.setQueueStatus(req, res));
  router.get('/api/admin/certificates', (req, res) => adminCtrl.getCertificates(req, res));

  return router;
}
