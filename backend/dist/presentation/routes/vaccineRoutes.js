"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVaccineRoutes = createVaccineRoutes;
const express_1 = require("express");
function createVaccineRoutes(controller) {
    const router = (0, express_1.Router)();
    router.get('/', (req, res) => controller.getAll(req, res));
    router.get('/admin', (req, res) => controller.getAllForAdmin(req, res));
    router.put('/:id', (req, res) => controller.update(req, res));
    router.delete('/:id', (req, res) => controller.delete(req, res));
    return router;
}
//# sourceMappingURL=vaccineRoutes.js.map