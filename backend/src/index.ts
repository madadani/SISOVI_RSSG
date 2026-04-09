import { env } from './infrastructure/config/env';
import { createApp } from './app';

const app = createApp();

app.listen(env.PORT, () => {
  console.log(`🚀 Server running on port ${env.PORT}`);
  console.log(`📋 Health check: http://localhost:${env.PORT}/health`);
});
