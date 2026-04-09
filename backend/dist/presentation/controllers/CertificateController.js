"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificateController = void 0;
class CertificateController {
    constructor(getCertificatesUseCase) {
        this.getCertificatesUseCase = getCertificatesUseCase;
    }
    async getByPatient(req, res) {
        try {
            const { nik, dob } = req.query;
            if (!nik || !dob) {
                res.status(400).json({ error: 'NIK and DOB are required' });
                return;
            }
            const certs = await this.getCertificatesUseCase.execute(nik, dob);
            res.json(certs);
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to fetch certificates' });
        }
    }
}
exports.CertificateController = CertificateController;
//# sourceMappingURL=CertificateController.js.map