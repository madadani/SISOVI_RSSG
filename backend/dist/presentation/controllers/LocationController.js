"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationController = void 0;
class LocationController {
    constructor(getLocationsUseCase) {
        this.getLocationsUseCase = getLocationsUseCase;
    }
    async getAll(_req, res) {
        try {
            const locations = await this.getLocationsUseCase.execute();
            res.json(locations);
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to fetch locations' });
        }
    }
}
exports.LocationController = LocationController;
//# sourceMappingURL=LocationController.js.map