import express from 'express';
import cors from 'cors';
import path from 'path';
import { createRouter } from './presentation/routes/index';
import { errorHandler } from './presentation/middleware/errorHandler';

export function createApp(): express.Application {
  const app = express();

  // ── Global Middleware ─────────────────────────────────────
  app.use(cors());
  app.use(express.json());

  // ── API Routes ──────────────────────────────────────────
  app.use('/api', createRouter());

  // ── Production Frontend Serving ────────────────────────────
  const frontendPath = path.join(__dirname, '../../frontend/dist');
  app.use(express.static(frontendPath));

  // Wildcard to handle client-side routing (SPAs)
  app.get(/.*/, (req, res, next) => {
    // If it's an API call, let it pass (though /api should catch it)
    if (req.url.startsWith('/api')) return next();
    res.sendFile(path.join(frontendPath, 'index.html'));
  });

  // ── Error Handler (must be last) ──────────────────────────
  app.use(errorHandler);

  return app;
}
