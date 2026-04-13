"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VaccineController = void 0;
class VaccineController {
    constructor(getVaccinesUseCase, updateVaccineUseCase, vaccineRepo) {
        this.getVaccinesUseCase = getVaccinesUseCase;
        this.updateVaccineUseCase = updateVaccineUseCase;
        this.vaccineRepo = vaccineRepo;
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
    async getAllForAdmin(_req, res) {
        try {
            if (this.vaccineRepo) {
                const vaccines = await this.vaccineRepo.findAll();
                res.json(vaccines);
            }
            else {
                const vaccines = await this.getVaccinesUseCase.execute();
                res.json(vaccines);
            }
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
    async delete(req, res) {
        try {
            const { id } = req.params;
            if (this.vaccineRepo) {
                await this.vaccineRepo.delete(id);
            }
            res.json({ success: true });
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to delete vaccine' });
        }
    }
}
exports.VaccineController = VaccineController;
//# sourceMappingURL=VaccineController.js.map