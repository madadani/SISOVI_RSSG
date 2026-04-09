export interface Registration {
    id: string;
    patientId: string;
    vaccineIds: string[];
    locationId: string;
    scheduleDate: Date;
    scheduleTime: string;
    queueNumber?: string | null;
    status: string;
    screeningResult?: string | null;
    createdAt: Date;
}
//# sourceMappingURL=Registration.d.ts.map