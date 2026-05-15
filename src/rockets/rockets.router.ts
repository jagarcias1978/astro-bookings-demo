import { Router, Request, Response } from "express";
import {
  VALID_RANGES,
  MIN_CAPACITY,
  MAX_CAPACITY,
  type CreateRocketDto,
  type UpdateRocketDto,
} from "./rockets.types.js";
import * as repo from "./rockets.repository.js";
import { logInfo, logWarn } from "../logger/app.logger.js";

export const rocketsRouter = Router();

const NOT_FOUND_ERROR = "Rocket not found.";

function sendBadRequest(res: Response, error: string): void {
  logWarn("error", "Validation failed", { error });
  res.status(400).json({ error });
}

function sendNotFound(res: Response, id: string): void {
  logWarn("rockets-route", "Rocket not found", { id });
  res.status(404).json({ error: NOT_FOUND_ERROR });
}

function getRocketId(req: Request): string {
  return req.params["id"] ?? "";
}

function validateOptionalFields(body: Partial<CreateRocketDto>): string | null {
  if (body.range !== undefined && !VALID_RANGES.includes(body.range)) {
    return `Range must be one of: ${VALID_RANGES.join(", ")}.`;
  }
  if (
    body.capacity !== undefined &&
    (body.capacity < MIN_CAPACITY || body.capacity > MAX_CAPACITY)
  ) {
    return `Capacity must be between ${MIN_CAPACITY} and ${MAX_CAPACITY}.`;
  }
  return null;
}

function validateCreateRocket(body: Partial<CreateRocketDto>): string | null {
  if (!body.name?.trim()) return "Name is required.";
  if (body.range === undefined) return "Range is required.";
  if (body.capacity === undefined) return "Capacity is required.";
  return validateOptionalFields(body);
}

function validateUpdateRocket(body: UpdateRocketDto): string | null {
  if (body.name !== undefined && !body.name.trim()) return "Name is required.";
  return validateOptionalFields(body);
}

rocketsRouter.get("/", (_req: Request, res: Response) => {
  logInfo("rockets-route", "Listing rockets");
  res.status(200).json(repo.findAll());
});

rocketsRouter.get("/:id", (req: Request, res: Response) => {
  const id = getRocketId(req);
  logInfo("rockets-route", "Fetching rocket", { id });
  const rocket = repo.findById(id);
  if (!rocket) {
    sendNotFound(res, id);
    return;
  }

  logInfo("rockets-route", "Rocket found", { id });
  res.status(200).json(rocket);
});

rocketsRouter.post("/", (req: Request, res: Response) => {
  logInfo("rockets-route", "Creating rocket request received");
  const body = req.body as Partial<CreateRocketDto>;
  const error = validateCreateRocket(body);
  if (error) {
    sendBadRequest(res, error);
    return;
  }

  const rocket = repo.create(body as CreateRocketDto);
  logInfo("rockets-route", "Rocket created", { id: rocket.id });
  res.status(201).json(rocket);
});

rocketsRouter.put("/:id", (req: Request, res: Response) => {
  const id = getRocketId(req);
  logInfo("rockets-route", "Updating rocket", { id });
  const body = req.body as UpdateRocketDto;
  const error = validateUpdateRocket(body);
  if (error) {
    sendBadRequest(res, error);
    return;
  }

  const rocket = repo.update(id, body);
  if (!rocket) {
    sendNotFound(res, id);
    return;
  }

  logInfo("rockets-route", "Rocket updated", { id });
  res.status(200).json(rocket);
});

rocketsRouter.delete("/:id", (req: Request, res: Response) => {
  const id = getRocketId(req);
  logInfo("rockets-route", "Deleting rocket", { id });
  const deleted = repo.remove(id);
  if (!deleted) {
    sendNotFound(res, id);
    return;
  }

  logInfo("rockets-route", "Rocket deleted", { id });
  res.status(204).send();
});
