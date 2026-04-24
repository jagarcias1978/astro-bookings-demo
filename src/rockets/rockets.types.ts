export type RocketRange = "suborbital" | "orbital" | "moon" | "mars";

export const VALID_RANGES: RocketRange[] = ["suborbital", "orbital", "moon", "mars"];
export const MIN_CAPACITY = 1;
export const MAX_CAPACITY = 10;

export type Rocket = {
  id: string;
  name: string;
  range: RocketRange;
  capacity: number;
};

export type CreateRocketDto = Pick<Rocket, "name" | "range" | "capacity">;
export type UpdateRocketDto = Partial<CreateRocketDto>;
