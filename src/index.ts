import express, { Express, Request, Response } from "express";
import { rocketsRouter } from "./rockets/rockets.router.js";
import { logInfo } from "./logger/app.logger.js";

const app: Express = express();
const PORT = process.env["PORT"] ?? "3000";
const API_VERSION = "1.0.0";

app.use(express.json());

app.use((req, res, next) => {
  const start = process.hrtime.bigint();
  logInfo("http", "Request started", {
    method: req.method,
    path: req.originalUrl,
  });

  res.on("finish", () => {
    const elapsedMs = Number(process.hrtime.bigint() - start) / 1_000_000;
    logInfo("http", "Request completed", {
      method: req.method,
      path: req.originalUrl,
      status: res.statusCode,
      durationMs: elapsedMs.toFixed(2),
    });
  });

  next();
});

// Health status endpoint
app.get("/health", (_req: Request, res: Response) => {
  logInfo("health", "Health endpoint accessed");
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Welcome endpoint
app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to Astro Bookings Demo API",
    version: API_VERSION,
  });
});

app.use("/rockets", rocketsRouter);

app.listen(PORT, () => {
  logInfo("app", "Server running", { url: `http://localhost:${PORT}` });
  logInfo("app", "Health check available", {
    url: `http://localhost:${PORT}/health`,
  });
});
