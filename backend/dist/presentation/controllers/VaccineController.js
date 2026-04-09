"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VaccineController = void 0;
class VaccineController {
    constructor(getVaccinesUseCase, updateVaccineUseCase) {
        this.getVaccinesUseCase = getVaccinesUseCase;
        this.updateVaccineUseCase = updateVaccineUseCase;
    }
    async getAll(_req, res) {
        try {
            const vaccines = await this.getVaccinesUseCase.execute();
            res.json(vaccines);
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to fetch vaccines' });
        }
    }
    async update(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;
            const updated = await this.updateVaccineUseCase.execute(id, data);
            res.json(updated);
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to update vaccine' });
        }
    }
}
exports.VaccineController = VaccineController;
//# sourceMappingURL=VaccineController.js.map