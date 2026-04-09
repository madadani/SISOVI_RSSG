export interface RegistrationResponseDTO {
    success: boolean;
    message: string;
    data?: {
        registrationId: string;
        queueNumber: string;
        patientName: string;
        scheduleDate: string;
        scheduleTime: string;
    };
}
//# sourceMappingURL=RegistrationResponseDTO.d.ts.map