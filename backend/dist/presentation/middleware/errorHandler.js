"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
function errorHandler(err, _req, res, _next) {
    console.error('[Error]', err.message);
    console.error(err.stack);
    res.status(500).json({
        success: false,
        error: 'Internal Server Error',
        message: process.env['NODE_ENV'] === 'development' ? err.message : 'Something went wrong',
    });
}
//# sourceMappingURL=errorHandler.js.map