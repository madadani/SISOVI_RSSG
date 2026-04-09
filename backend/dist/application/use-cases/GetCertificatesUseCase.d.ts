import type { ICertificateRepository } from '../../domain/repositories/ICertificateRepository';
export declare class GetCertificatesUseCase {
    private readonly certificateRepository;
    constructor(certificateRepository: ICertificateRepository);
    execute(nik: string, dob: string): Promise<import("../../domain/repositories/ICertificateRepository").Certificate[]>;
}
//# sourceMappingURL=GetCertificatesUseCase.d.ts.map