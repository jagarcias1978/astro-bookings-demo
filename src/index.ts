import express, { Express, Request, Response } from "express";
import { rocketsRouter } from "./rockets/rockets.router.js";

const app: Express = express();
const PORT = process.env["PORT"] || 3000;

app.use(express.json());
app.use("/rockets", rocketsRouter);

// Health status endpoint
app.get("/health", (_req: Request, res: Response) => {
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
    version: "1.1.0",
  });
});

app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`);
  console.log(`✓ Health check: http://localhost:${PORT}/health`);
});
