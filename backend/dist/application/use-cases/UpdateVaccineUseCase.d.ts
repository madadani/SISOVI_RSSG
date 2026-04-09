import type { IVaccineRepository } from '../../domain/repositories/IVaccineRepository';
import type { Vaccine } from '../../domain/entities/Vaccine';
export declare class UpdateVaccineUseCase {
    private readonly vaccineRepository;
    constructor(vaccineRepository: IVaccineRepository);
    execute(id: string, data: Partial<Vaccine>): Promise<Vaccine>;
}
//# sourceMappingURL=UpdateVaccineUseCase.d.ts.map