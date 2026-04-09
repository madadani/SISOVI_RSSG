export interface Certificate {
    id: string;
    patientId: string;
    vaccineId: string;
    issuedDate: Date;
    batchNumber: string;
    doctorName: string;
    qrCode?: string | null;
    filePath: string;
}
//# sourceMappingURL=Certificate.d.ts.map