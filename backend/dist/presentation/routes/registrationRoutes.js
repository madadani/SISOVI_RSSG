"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRegistrationRoutes = createRegistrationRoutes;
const express_1 = require("express");
function createRegistrationRoutes(controller) {
    const router = (0, express_1.Router)();
    router.post('/', (req, res) => controller.register(req, res));
    return router;
}
//# sourceMappingURL=registrationRoutes.js.map