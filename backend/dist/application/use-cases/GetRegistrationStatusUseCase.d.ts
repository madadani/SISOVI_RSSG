import type { IRegistrationRepository } from '../../domain/repositories/IRegistrationRepository';
export declare class GetRegistrationStatusUseCase {
    private readonly registrationRepository;
    constructor(registrationRepository: IRegistrationRepository);
    execute(queueNumber: string): Promise<import("../../domain/entities").Registration | null>;
}
//# sourceMappingURL=GetRegistrationStatusUseCase.d.ts.map