"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateVaccineUseCase = void 0;
class UpdateVaccineUseCase {
    constructor(vaccineRepository) {
        this.vaccineRepository = vaccineRepository;
    }
    async execute(id, data) {
        const vaccine = await this.vaccineRepository.findById(id);
        if (!vaccine) {
            throw new Error('Vaccine not found');
        }
        return this.vaccineRepository.update(id, data);
    }
}
exports.UpdateVaccineUseCase = UpdateVaccineUseCase;
//# sourceMappingURL=UpdateVaccineUseCase.js.map