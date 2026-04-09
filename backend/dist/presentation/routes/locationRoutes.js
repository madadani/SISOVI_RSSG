"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLocationRoutes = createLocationRoutes;
const express_1 = require("express");
function createLocationRoutes(controller) {
    const router = (0, express_1.Router)();
    router.get('/', (req, res) => controller.getAll(req, res));
    return router;
}
//# sourceMappingURL=locationRoutes.js.map