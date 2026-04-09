"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaCertificateRepository = void 0;
class PrismaCertificateRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findByPatientNikAndDob(nik, dob) {
        const certs = await this.prisma.certificate.findMany({
            where: {
                patient: {
                    nik: nik,
                    birthdate: dob
                }
            },
            include: {
                patient: true,
                vaccine: true
            }
        });
        return certs.map(c => ({
            id: c.id,
            patientId: c.patientId,
            vaccineName: c.vaccine.name,
            certificateNumber: c.id,
            issueDate: c.issuedDate,
            batchNumber: c.batchNumber,
            patient: c.patient
        }));
    }
    async findById(id) {
        const cert = await this.prisma.certificate.findUnique({
            where: { id },
            include: {
                patient: true,
                vaccine: true
            }
        });
        if (!cert)
            return null;
        return cert;
    }
}
exports.PrismaCertificateRepository = PrismaCertificateRepository;
//# sourceMappingURL=PrismaCertificateRepository.js.map