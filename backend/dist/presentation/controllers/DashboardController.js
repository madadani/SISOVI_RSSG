"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardController = void 0;
class DashboardController {
    constructor(getDashboardStatsUseCase) {
        this.getDashboardStatsUseCase = getDashboardStatsUseCase;
    }
    async getStats(_req, res) {
        try {
            const stats = await this.getDashboardStatsUseCase.execute();
            res.json(stats);
        }
        catch (error) {
            // Keep the response generic, but log details for debugging.
            console.error('[DashboardController] Failed to fetch dashboard stats:', error);
            res.status(500).json({ error: 'Failed to fetch dashboard stats' });
        }
    }
}
exports.DashboardController = DashboardController;
//# sourceMappingURL=DashboardController.js.map