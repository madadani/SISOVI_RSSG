"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createScreeningRoutes = createScreeningRoutes;
const express_1 = require("express");
function createScreeningRoutes(controller) {
    const router = (0, express_1.Router)();
    router.get('/', (req, res) => controller.getAll(req, res));
    return router;
}
//# sourceMappingURL=screeningRoutes.js.map