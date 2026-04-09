"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetRegistrationStatusUseCase = void 0;
class GetRegistrationStatusUseCase {
    constructor(registrationRepository) {
        this.registrationRepository = registrationRepository;
    }
    async execute(queueNumber) {
        const reg = await this.registrationRepository.findById(queueNumber); // Assuming we can find by queueNumber
        // Actually our interface for findById expects ID, let's fix the repo to find by queueNumber.
        return reg;
    }
}
exports.GetRegistrationStatusUseCase = GetRegistrationStatusUseCase;
//# sourceMappingURL=GetRegistrationStatusUseCase.js.map