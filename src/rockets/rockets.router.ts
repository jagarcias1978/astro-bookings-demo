import { Router, Request, Response } from "express";
import {
  VALID_RANGES,
  MIN_CAPACITY,
  MAX_CAPACITY,
  type CreateRocketDto,
  type UpdateRocketDto,
} from "./rockets.types.js";
import * as repo from "./rockets.repository.js";

export const rocketsRouter = Router();

const NOT_FOUND_ERROR = "Rocket not found.";

function sendBadRequest(res: Response, error: string): void {
  res.status(400).json({ error });
}

function sendNotFound(res: Response): void {
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
  res.status(200).json(repo.findAll());
});

rocketsRouter.get("/:id", (req: Request, res: Response) => {
  const id = getRocketId(req);
  const rocket = repo.findById(id);
  if (!rocket) {
    sendNotFound(res);
    return;
  }
  res.status(200).json(rocket);
});

rocketsRouter.post("/", (req: Request, res: Response) => {
  const body = req.body as Partial<CreateRocketDto>;
  const error = validateCreateRocket(body);
  if (error) {
    sendBadRequest(res, error);
    return;
  }
  const rocket = repo.create(body as CreateRocketDto);
  res.status(201).json(rocket);
});

rocketsRouter.put("/:id", (req: Request, res: Response) => {
  const body = req.body as UpdateRocketDto;
  const error = validateUpdateRocket(body);
  if (error) {
    sendBadRequest(res, error);
    return;
  }
  const id = getRocketId(req);
  const rocket = repo.update(id, body);
  if (!rocket) {
    sendNotFound(res);
    return;
  }
  res.status(200).json(rocket);
});

rocketsRouter.delete("/:id", (req: Request, res: Response) => {
  const id = getRocketId(req);
  const deleted = repo.remove(id);
  if (!deleted) {
    sendNotFound(res);
    return;
  }
  res.status(204).send();
});
