import type { Patient } from '../entities/Patient';
export interface Certificate {
    id: string;
    registrationId: string;
    patientId: string;
    vaccineName: string;
    certificateNumber: string;
    issueDate: Date;
    batchNumber: string;
    qrCode?: string;
    patient?: Patient;
}
export interface ICertificateRepository {
    findByPatientNikAndDob(nik: string, dob: Date): Promise<Certificate[]>;
    findById(id: string): Promise<Certificate | null>;
}
//# sourceMappingURL=ICertificateRepository.d.ts.map