import type { IVaccineRepository } from '../../domain/repositories/IVaccineRepository';
import type { Vaccine } from '../../domain/entities/Vaccine';
export declare class GetVaccinesUseCase {
    private readonly vaccineRepository;
    constructor(vaccineRepository: IVaccineRepository);
    execute(): Promise<Vaccine[]>;
}
//# sourceMappingURL=GetVaccinesUseCase.d.ts.map