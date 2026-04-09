"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetLocationsUseCase = void 0;
class GetLocationsUseCase {
    constructor(locationRepository) {
        this.locationRepository = locationRepository;
    }
    async execute() {
        return this.locationRepository.findAllActive();
    }
}
exports.GetLocationsUseCase = GetLocationsUseCase;
//# sourceMappingURL=GetLocationsUseCase.js.map