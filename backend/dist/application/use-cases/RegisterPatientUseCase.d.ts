import type { IPatientRepository } from '../../domain/repositories/IPatientRepository';
import type { IRegistrationRepository } from '../../domain/repositories/IRegistrationRepository';
import type { IScreeningAnswerRepository } from '../../domain/repositories/IScreeningAnswerRepository';
import type { RegisterPatientDTO } from '../dtos/RegisterPatientDTO';
import type { RegistrationResponseDTO } from '../dtos/RegistrationResponseDTO';
export declare class RegisterPatientUseCase {
    private readonly patientRepository;
    private readonly registrationRepository;
    private readonly screeningAnswerRepository;
    constructor(patientRepository: IPatientRepository, registrationRepository: IRegistrationRepository, screeningAnswerRepository: IScreeningAnswerRepository);
    execute(dto: RegisterPatientDTO): Promise<RegistrationResponseDTO>;
}
//# sourceMappingURL=RegisterPatientUseCase.d.ts.map