import { env } from './infrastructure/config/env';
import { createApp } from './app';

const app = createApp();

app.listen(env.PORT, () => {
  console.log(`🚀 Server running on port ${env.PORT}`);
<<<<<<< HEAD
  console.log(`📋 Health check: http://localhost:${env.PORT}/api/health`);
=======
  console.log(`📋 Health check: http://192.168.100.9:${env.PORT}/health`);
>>>>>>> 3b2018275381c9b91d6deea228aae2895725e5ef
});
