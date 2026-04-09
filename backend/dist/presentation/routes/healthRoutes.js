"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHealthRoutes = createHealthRoutes;
const express_1 = require("express");
function createHealthRoutes(controller) {
    const router = (0, express_1.Router)();
    router.get('/health', (req, res) => controller.check(req, res));
    return router;
}
//# sourceMappingURL=healthRoutes.js.map