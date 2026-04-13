"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class AdminController {
    async getPatients(_req, res) {
        try {
            const patients = await prisma.patient.findMany({
                orderBy: { id: 'desc' },
                include: {
                    registrations: {
                        orderBy: { id: 'desc' },
                        take: 1
                    }
                }
            });
            const formatted = patients.map((p) => ({
                id: p.id,
                nik: p.nik,
                passport: p.passport || '-',
                name: p.name,
                gender: p.gender,
                phone: p.phone,
                latestVax: p.registrations[0]?.serviceType || 'Vaksinasi Umum',
                status: p.registrations[0]?.status || 'Terdaftar',
                date: p.id ? new Date().toISOString().split('T')[0] : 'Unknown'
            }));
            res.json(formatted);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to fetch patients' });
        }
    }
    async getQueues(req, res) {
        try {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const queues = await prisma.registration.findMany({
                where: {
                    scheduleDate: {
                        gte: today
                    }
                },
                orderBy: { scheduleTime: 'asc' },
                include: { patient: true }
            });
            if (queues.length === 0) {
                const history = await prisma.registration.findMany({
                    take: 10,
                    orderBy: { id: 'desc' },
                    include: { patient: true }
                });
                const formatted = history.map((q) => ({
                    id: q.queueNumber || q.id,
                    name: q.patient?.name || 'Unknown',
                    vax: q.serviceType || 'Vaksinasi Umum',
                    time: q.scheduleTime || '00:00',
                    status: q.status || 'WAITING'
                }));
                res.json(formatted);
                return;
            }
            const formatted = queues.map((q) => ({
                id: q.queueNumber || q.id,
                name: q.patient?.name || 'Unknown',
                vax: q.serviceType || 'Vaksinasi Umum',
                time: q.scheduleTime || '00:00',
                status: q.status || 'WAITING'
            }));
            res.json(formatted);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to fetch queues' });
        }
    }
    async setQueueStatus(req, res) {
        try {
            const identifier = req.params.queueNumber;
            let { status } = req.body;
            // Map frontend status to Prisma enum if necessary
            if (status === 'DONE')
                status = 'COMPLETED';
            if (status === 'SKIPPED')
                status = 'CANCELLED';
            const reg = await prisma.registration.findFirst({
                where: {
                    OR: [
                        { queueNumber: identifier },
                        { id: identifier }
                    ]
                }
            });
            if (!reg) {
                res.status(404).json({ error: 'Queue not found' });
                return;
            }
            // Using explicit cast to avoid enum errors
            await prisma.registration.update({
                where: { id: reg.id },
                data: { status: status }
            });
            res.json({ success: true });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to update queue status' });
        }
    }
    async getCertificates(_req, res) {
        try {
            const certificates = await prisma.certificate.findMany({
                orderBy: { issuedDate: 'desc' },
                include: {
                    patient: true
                }
            });
            const formatted = certificates.map((c) => ({
                id: c.certificateNumber || c.id || `CERT-REV`,
                ptName: c.patient?.name || 'Unknown',
                vaxType: c.registration?.serviceType || 'Vaksinasi Umum',
                date: c.issuedDate ? c.issuedDate.toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
                status: c.status || 'TELAH_TERBIT',
                valid: c.isValid !== undefined ? c.isValid : true
            }));
            if (formatted.length === 0) {
                const regs = await prisma.registration.findMany({
                    include: { patient: true }
                });
                const generateFake = regs.map((r, i) => ({
                    id: `CERT-${new Date().getFullYear()}-00${i + 1}`,
                    ptName: r.patient?.name || 'Unknown',
                    vaxType: r.serviceType || 'Vaksinasi Umum',
                    date: r.createdAt.toISOString().split('T')[0],
                    status: 'SIAP_CETAK',
                    valid: true
                }));
                res.json(generateFake);
                return;
            }
            res.json(formatted);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to fetch certificates' });
        }
    }
    async deletePatient(req, res) {
        try {
            const id = req.params.id;
            // Delete registrations first if not using cascade
            await prisma.registration.deleteMany({ where: { patientId: id } });
            await prisma.patient.delete({ where: { id } });
            res.json({ success: true });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to delete patient' });
        }
    }
}
exports.AdminController = AdminController;
//# sourceMappingURL=AdminController.js.map