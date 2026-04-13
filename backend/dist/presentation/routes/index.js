"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRouter = createRouter;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// Use Cases
const GetLocationsUseCase_1 = require("../../application/use-cases/GetLocationsUseCase");
const GetVaccinesUseCase_1 = require("../../application/use-cases/GetVaccinesUseCase");
const UpdateVaccineUseCase_1 = require("../../application/use-cases/UpdateVaccineUseCase");
const GetScreeningQuestionsUseCase_1 = require("../../application/use-cases/GetScreeningQuestionsUseCase");
const RegisterPatientUseCase_1 = require("../../application/use-cases/RegisterPatientUseCase");
const GetDashboardStatsUseCase_1 = require("../../application/use-cases/GetDashboardStatsUseCase");
const GetCertificatesUseCase_1 = require("../../application/use-cases/GetCertificatesUseCase");
const GetRegistrationStatusUseCase_1 = require("../../application/use-cases/GetRegistrationStatusUseCase");
// Infrastructure Repositories
const PrismaLocationRepository_1 = require("../../infrastructure/repositories/PrismaLocationRepository");
const PrismaVaccineRepository_1 = require("../../infrastructure/repositories/PrismaVaccineRepository");
const PrismaScreeningQuestionRepository_1 = require("../../infrastructure/repositories/PrismaScreeningQuestionRepository");
const PrismaPatientRepository_1 = require("../../infrastructure/repositories/PrismaPatientRepository");
const PrismaRegistrationRepository_1 = require("../../infrastructure/repositories/PrismaRegistrationRepository");
const PrismaScreeningAnswerRepository_1 = require("../../infrastructure/repositories/PrismaScreeningAnswerRepository");
const PrismaCertificateRepository_1 = require("../../infrastructure/repositories/PrismaCertificateRepository");
// Controllers
const HealthController_1 = require("../controllers/HealthController");
const LocationController_1 = require("../controllers/LocationController");
const VaccineController_1 = require("../controllers/VaccineController");
const ScreeningQuestionController_1 = require("../controllers/ScreeningQuestionController");
const RegistrationController_1 = require("../controllers/RegistrationController");
const DashboardController_1 = require("../controllers/DashboardController");
const CertificateController_1 = require("../controllers/CertificateController");
const AdminController_1 = require("../controllers/AdminController");
// Route creators
const healthRoutes_1 = require("./healthRoutes");
const locationRoutes_1 = require("./locationRoutes");
const vaccineRoutes_1 = require("./vaccineRoutes");
const screeningRoutes_1 = require("./screeningRoutes");
const registrationRoutes_1 = require("./registrationRoutes");
// Prisma client
const prisma_1 = __importDefault(require("../../infrastructure/database/prisma"));
function createRouter() {
    const router = (0, express_1.Router)();
    // ── Repositories (Infrastructure) ─────────────────────────
    const locationRepo = new PrismaLocationRepository_1.PrismaLocationRepository(prisma_1.default);
    const vaccineRepo = new PrismaVaccineRepository_1.PrismaVaccineRepository(prisma_1.default);
    const questionRepo = new PrismaScreeningQuestionRepository_1.PrismaScreeningQuestionRepository(prisma_1.default);
    const patientRepo = new PrismaPatientRepository_1.PrismaPatientRepository(prisma_1.default);
    const registrationRepo = new PrismaRegistrationRepository_1.PrismaRegistrationRepository(prisma_1.default);
    const answerRepo = new PrismaScreeningAnswerRepository_1.PrismaScreeningAnswerRepository(prisma_1.default);
    const certificateRepo = new PrismaCertificateRepository_1.PrismaCertificateRepository(prisma_1.default);
    // ── Use Cases (Application) ───────────────────────────────
    const getLocationsUC = new GetLocationsUseCase_1.GetLocationsUseCase(locationRepo);
    const getVaccinesUC = new GetVaccinesUseCase_1.GetVaccinesUseCase(vaccineRepo);
    const updateVaccineUC = new UpdateVaccineUseCase_1.UpdateVaccineUseCase(vaccineRepo);
    const getQuestionsUC = new GetScreeningQuestionsUseCase_1.GetScreeningQuestionsUseCase(questionRepo);
    const registerPatientUC = new RegisterPatientUseCase_1.RegisterPatientUseCase(patientRepo, registrationRepo, answerRepo);
    const getDashboardStatsUC = new GetDashboardStatsUseCase_1.GetDashboardStatsUseCase(registrationRepo, vaccineRepo, patientRepo);
    const getCertificatesUC = new GetCertificatesUseCase_1.GetCertificatesUseCase(certificateRepo);
    const getRegistrationStatusUC = new GetRegistrationStatusUseCase_1.GetRegistrationStatusUseCase(registrationRepo);
    // ── Controllers (Presentation) ────────────────────────────
    const healthCtrl = new HealthController_1.HealthController();
    const locationCtrl = new LocationController_1.LocationController(getLocationsUC);
    const vaccineCtrl = new VaccineController_1.VaccineController(getVaccinesUC, updateVaccineUC, vaccineRepo);
    const questionCtrl = new ScreeningQuestionController_1.ScreeningQuestionController(getQuestionsUC);
    const registrationCtrl = new RegistrationController_1.RegistrationController(registerPatientUC, getRegistrationStatusUC);
    const dashboardCtrl = new DashboardController_1.DashboardController(getDashboardStatsUC);
    const certificateCtrl = new CertificateController_1.CertificateController(getCertificatesUC);
    const adminCtrl = new AdminController_1.AdminController();
    // ── Mount Routes ──────────────────────────────────────────
    router.use((0, healthRoutes_1.createHealthRoutes)(healthCtrl));
    router.use('/locations', (0, locationRoutes_1.createLocationRoutes)(locationCtrl));
    router.use('/vaccines', (0, vaccineRoutes_1.createVaccineRoutes)(vaccineCtrl));
    router.use('/questions', (0, screeningRoutes_1.createScreeningRoutes)(questionCtrl));
    router.use('/register', (0, registrationRoutes_1.createRegistrationRoutes)(registrationCtrl));
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
    const uploadsDir = path_1.default.join(__dirname, '../../../uploads');
    if (!fs_1.default.existsSync(uploadsDir))
        fs_1.default.mkdirSync(uploadsDir, { recursive: true });
    const storage = multer_1.default.diskStorage({
        destination: (_req, _file, cb) => cb(null, uploadsDir),
        filename: (_req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, uniqueSuffix + path_1.default.extname(file.originalname));
        }
    });
    const upload = (0, multer_1.default)({ storage, limits: { fileSize: 5 * 1024 * 1024 } });
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
            const existing = await prisma_1.default.document.findFirst({
                where: { registrationId, type }
            });
            if (existing) {
                // Update existing document
                const updated = await prisma_1.default.document.update({
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
            }
            else {
                // Create new document
                const doc = await prisma_1.default.document.create({
                    data: {
                        registrationId,
                        type,
                        filePath: file.path,
                        status: 'PENDING'
                    }
                });
                res.json({ success: true, document: doc });
            }
        }
        catch (error) {
            console.error('Upload error:', error);
            res.status(500).json({ error: 'Failed to upload document' });
        }
    });
    // ── Certificate Download Route ────────────────────────────
    router.get('/certificates/:id/download', async (req, res) => {
        try {
            const cert = await prisma_1.default.certificate.findUnique({
                where: { id: req.params.id },
                include: { patient: true, vaccine: true }
            });
            if (!cert) {
                res.status(404).json({ error: 'Certificate not found' });
                return;
            }
            // If a physical file exists, send it
            if (cert.filePath && fs_1.default.existsSync(cert.filePath)) {
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
        }
        catch (error) {
            console.error('Certificate download error:', error);
            res.status(500).json({ error: 'Failed to download certificate' });
        }
    });
    return router;
}
//# sourceMappingURL=index.js.map