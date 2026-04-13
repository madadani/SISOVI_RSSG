import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

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
  const vaccineCtrl = new VaccineController(getVaccinesUC, updateVaccineUC, vaccineRepo);
  const questionCtrl = new ScreeningQuestionController(getQuestionsUC);
  const registrationCtrl = new RegistrationController(registerPatientUC, getRegistrationStatusUC);
  const dashboardCtrl = new DashboardController(getDashboardStatsUC);
  const certificateCtrl = new CertificateController(getCertificatesUC);
  const adminCtrl = new AdminController();

  // ── Mount Routes ──────────────────────────────────────────
  router.use(createHealthRoutes(healthCtrl));
  router.use('/locations', createLocationRoutes(locationCtrl));
  router.use('/vaccines', createVaccineRoutes(vaccineCtrl));
  router.use('/questions', createScreeningRoutes(questionCtrl));
  router.use('/register', createRegistrationRoutes(registrationCtrl));
  router.get('/registration/status', (req, res) => registrationCtrl.getStatus(req, res));
  router.get('/dashboard', (req, res) => dashboardCtrl.getStats(req, res));
  router.get('/certificates', (req, res) => certificateCtrl.getByPatient(req, res));
  
  // Admin Routes
  router.get('/admin/patients', (req, res) => adminCtrl.getPatients(req, res));
  router.delete('/admin/patients/:id', (req, res) => adminCtrl.deletePatient(req, res));
  router.get('/admin/queues', (req, res) => adminCtrl.getQueues(req, res));
  router.put('/admin/queues/:queueNumber/status', (req, res) => adminCtrl.setQueueStatus(req, res));
  router.get('/admin/certificates', (req, res) => adminCtrl.getCertificates(req, res));

  // ── File Upload Config ────────────────────────────────────
  const uploadsDir = path.join(__dirname, '../../../uploads');
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

  const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadsDir),
    filename: (_req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    }
  });
  const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

  // ── Document Upload Route ─────────────────────────────────
  router.post('/documents/upload', upload.single('file'), async (req, res) => {
    try {
      const { registrationId, type } = req.body;
      const file = req.file;

      if (!file || !registrationId || !type) {
        res.status(400).json({ error: 'File, registrationId, and type are required' });
        return;
      }

      // Check if document already exists for this registration + type
      const existing = await prisma.document.findFirst({
        where: { registrationId, type }
      });

      if (existing) {
        // Update existing document
        const updated = await prisma.document.update({
          where: { id: existing.id },
          data: {
            filePath: file.path,
            status: 'PENDING',
            notes: null,
            verifiedBy: null,
            verifiedAt: null
          }
        });
        res.json({ success: true, document: updated });
      } else {
        // Create new document
        const doc = await prisma.document.create({
          data: {
            registrationId,
            type,
            filePath: file.path,
            status: 'PENDING'
          }
        });
        res.json({ success: true, document: doc });
      }
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({ error: 'Failed to upload document' });
    }
  });

  // ── Certificate Download Route ────────────────────────────
  router.get('/certificates/:id/download', async (req, res) => {
    try {
      const cert = await prisma.certificate.findUnique({
        where: { id: req.params.id },
        include: { patient: true, vaccine: true }
      });

      if (!cert) {
        res.status(404).json({ error: 'Certificate not found' });
        return;
      }

      // If a physical file exists, send it
      if (cert.filePath && fs.existsSync(cert.filePath)) {
        res.download(cert.filePath);
        return;
      }

      // Otherwise generate a simple text-based response
      res.json({
        id: cert.id,
        patientName: cert.patient.name,
        vaccineName: cert.vaccine.name,
        batchNumber: cert.batchNumber,
        doctorName: cert.doctorName,
        issuedDate: cert.issuedDate,
        message: 'No physical file available. Use print from frontend.'
      });
    } catch (error) {
      console.error('Certificate download error:', error);
      res.status(500).json({ error: 'Failed to download certificate' });
    }
  });

  return router;
}
