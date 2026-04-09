"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetVaccinesUseCase = void 0;
class GetVaccinesUseCase {
    constructor(vaccineRepository) {
        this.vaccineRepository = vaccineRepository;
    }
    async execute() {
        return this.vaccineRepository.findAllActive();
    }
}
exports.GetVaccinesUseCase = GetVaccinesUseCase;
//# sourceMappingURL=GetVaccinesUseCase.js.map