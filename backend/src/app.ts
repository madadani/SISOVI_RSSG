import express from 'express';
import cors from 'cors';
import { createRouter } from './presentation/routes/index';
import { errorHandler } from './presentation/middleware/errorHandler';

export function createApp(): express.Application {
  const app = express();

  // ── Global Middleware ─────────────────────────────────────
  app.use(cors());
  app.use(express.json());

  // ── Routes ────────────────────────────────────────────────
  app.use(createRouter());

  // ── Error Handler (must be last) ──────────────────────────
  app.use(errorHandler);

  return app;
}
