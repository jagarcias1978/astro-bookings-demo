import { randomUUID } from "crypto";
import type { Rocket, CreateRocketDto, UpdateRocketDto } from "./rockets.types.js";
import { logInfo, logWarn } from "../logger/app.logger.js";

const rockets: Map<string, Rocket> = new Map();

export function findAll(): Rocket[] {
  logInfo("rockets-repo", "findAll called", { count: rockets.size });
  return Array.from(rockets.values());
}

export function findById(id: string): Rocket | undefined {
  const rocket = rockets.get(id);
  if (!rocket) {
    logWarn("rockets-repo", "findById miss", { id });
    return undefined;
  }

  logInfo("rockets-repo", "findById hit", { id });
  return rocket;
}

export function create(dto: CreateRocketDto): Rocket {
  const rocket: Rocket = { id: randomUUID(), ...dto };
  rockets.set(rocket.id, rocket);
  logInfo("rockets-repo", "create stored", { id: rocket.id });
  return rocket;
}

export function update(id: string, dto: UpdateRocketDto): Rocket | undefined {
  const existing = rockets.get(id);
  if (!existing) {
    logWarn("rockets-repo", "update miss", { id });
    return undefined;
  }

  const updated: Rocket = { ...existing, ...dto };
  rockets.set(id, updated);
  logInfo("rockets-repo", "update stored", { id });
  return updated;
}

export function remove(id: string): boolean {
  const deleted = rockets.delete(id);
  if (!deleted) {
    logWarn("rockets-repo", "remove miss", { id });
    return false;
  }

  logInfo("rockets-repo", "remove deleted", { id });
  return true;
}
