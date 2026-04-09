"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("./infrastructure/config/env");
const app_1 = require("./app");
const app = (0, app_1.createApp)();
app.listen(env_1.env.PORT, () => {
    console.log(`🚀 Server running on port ${env_1.env.PORT}`);
    console.log(`📋 Health check: http://localhost:${env_1.env.PORT}/health`);
});
//# sourceMappingURL=index.js.map