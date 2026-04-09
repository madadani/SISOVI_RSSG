"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCertificatesUseCase = void 0;
class GetCertificatesUseCase {
    constructor(certificateRepository) {
        this.certificateRepository = certificateRepository;
    }
    async execute(nik, dob) {
        return this.certificateRepository.findByPatientNikAndDob(nik, new Date(dob));
    }
}
exports.GetCertificatesUseCase = GetCertificatesUseCase;
//# sourceMappingURL=GetCertificatesUseCase.js.map