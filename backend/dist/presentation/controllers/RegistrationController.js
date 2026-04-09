"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistrationController = void 0;
class RegistrationController {
    constructor(registerPatientUseCase, getRegistrationStatusUseCase) {
        this.registerPatientUseCase = registerPatientUseCase;
        this.getRegistrationStatusUseCase = getRegistrationStatusUseCase;
    }
    async register(req, res) {
        try {
            const dto = req.body;
            const result = await this.registerPatientUseCase.execute(dto);
            res.json(result);
        }
        catch (error) {
            console.error('Registration controller error:', error);
            res.status(500).json({ error: error.message || 'Failed to register' });
        }
    }
    async getStatus(req, res) {
        try {
            const { queueNumber } = req.query;
            if (!queueNumber) {
                res.status(400).json({ error: 'Queue number is required' });
                return;
            }
            const result = await this.getRegistrationStatusUseCase.execute(queueNumber);
            if (!result) {
                res.status(404).json({ error: 'Registration not found' });
                return;
            }
            res.json(result);
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to fetch status' });
        }
    }
}
exports.RegistrationController = RegistrationController;
//# sourceMappingURL=RegistrationController.js.map