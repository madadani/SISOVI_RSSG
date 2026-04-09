"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const index_1 = require("./presentation/routes/index");
const errorHandler_1 = require("./presentation/middleware/errorHandler");
function createApp() {
    const app = (0, express_1.default)();
    // ── Global Middleware ─────────────────────────────────────
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    // ── API Routes ──────────────────────────────────────────
    app.use('/api', (0, index_1.createRouter)());
    // ── Production Frontend Serving ────────────────────────────
    const frontendPath = path_1.default.join(__dirname, '../../frontend/dist');
    app.use(express_1.default.static(frontendPath));
    // Wildcard to handle client-side routing (SPAs)
    app.get('*', (req, res, next) => {
        // If it's an API call, let it pass (though /api should catch it)
        if (req.url.startsWith('/api'))
            return next();
        res.sendFile(path_1.default.join(frontendPath, 'index.html'));
    });
    // ── Error Handler (must be last) ──────────────────────────
    app.use(errorHandler_1.errorHandler);
    return app;
}
//# sourceMappingURL=app.js.map