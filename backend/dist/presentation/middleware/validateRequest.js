"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = validateRequest;
function validateRequest(schema) {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({
                success: false,
                error: 'Validation Error',
                details: result.error.issues,
            });
            return;
        }
        req.body = result.data;
        next();
    };
}
//# sourceMappingURL=validateRequest.js.map