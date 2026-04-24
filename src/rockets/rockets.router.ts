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

function validateRocketFields(
  body: Partial<CreateRocketDto>,
  requireAll: boolean
): string | null {
  if (requireAll && !body.name?.trim()) {
    return "Name is required.";
  }
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

rocketsRouter.get("/", (_req: Request, res: Response) => {
  res.status(200).json(repo.findAll());
});

rocketsRouter.get("/:id", (req: Request, res: Response) => {
  const rocket = repo.findById(req.params["id"]!);
  if (!rocket) {
    res.status(404).json({ error: "Rocket not found." });
    return;
  }
  res.status(200).json(rocket);
});

rocketsRouter.post("/", (req: Request, res: Response) => {
  const body = req.body as Partial<CreateRocketDto>;
  const error = validateRocketFields(body, true);
  if (error) {
    res.status(400).json({ error });
    return;
  }
  const rocket = repo.create(body as CreateRocketDto);
  res.status(201).json(rocket);
});

rocketsRouter.put("/:id", (req: Request, res: Response) => {
  const body = req.body as UpdateRocketDto;
  const error = validateRocketFields(body, false);
  if (error) {
    res.status(400).json({ error });
    return;
  }
  const rocket = repo.update(req.params["id"]!, body);
  if (!rocket) {
    res.status(404).json({ error: "Rocket not found." });
    return;
  }
  res.status(200).json(rocket);
});

rocketsRouter.delete("/:id", (req: Request, res: Response) => {
  const deleted = repo.remove(req.params["id"]!);
  if (!deleted) {
    res.status(404).json({ error: "Rocket not found." });
    return;
  }
  res.status(204).send();
});
