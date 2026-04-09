"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRouter = createRouter;
const express_1 = require("express");
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
    const vaccineCtrl = new VaccineController_1.VaccineController(getVaccinesUC, updateVaccineUC);
    const questionCtrl = new ScreeningQuestionController_1.ScreeningQuestionController(getQuestionsUC);
    const registrationCtrl = new RegistrationController_1.RegistrationController(registerPatientUC, getRegistrationStatusUC);
    const dashboardCtrl = new DashboardController_1.DashboardController(getDashboardStatsUC);
    const certificateCtrl = new CertificateController_1.CertificateController(getCertificatesUC);
    const adminCtrl = new AdminController_1.AdminController();
    // ── Mount Routes ──────────────────────────────────────────
    router.use((0, healthRoutes_1.createHealthRoutes)(healthCtrl));
    router.use('/api/locations', (0, locationRoutes_1.createLocationRoutes)(locationCtrl));
    router.use('/api/vaccines', (0, vaccineRoutes_1.createVaccineRoutes)(vaccineCtrl));
    router.use('/api/questions', (0, screeningRoutes_1.createScreeningRoutes)(questionCtrl));
    router.use('/api/register', (0, registrationRoutes_1.createRegistrationRoutes)(registrationCtrl));
    router.get('/api/registration/status', (req, res) => registrationCtrl.getStatus(req, res));
    router.get('/api/dashboard', (req, res) => dashboardCtrl.getStats(req, res));
    router.get('/api/certificates', (req, res) => certificateCtrl.getByPatient(req, res));
    // Admin Routes
    router.get('/api/admin/patients', (req, res) => adminCtrl.getPatients(req, res));
    router.delete('/api/admin/patients/:id', (req, res) => adminCtrl.deletePatient(req, res));
    router.get('/api/admin/queues', (req, res) => adminCtrl.getQueues(req, res));
    router.put('/api/admin/queues/:queueNumber/status', (req, res) => adminCtrl.setQueueStatus(req, res));
    router.get('/api/admin/certificates', (req, res) => adminCtrl.getCertificates(req, res));
    return router;
}
//# sourceMappingURL=index.js.map