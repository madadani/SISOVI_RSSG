"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthController = void 0;
class HealthController {
    check(_req, res) {
        res.json({
            status: 'OK',
            message: 'SISOV-RSSG Backend is running',
            timestamp: new Date().toISOString(),
        });
    }
}
exports.HealthController = HealthController;
//# sourceMappingURL=HealthController.js.map