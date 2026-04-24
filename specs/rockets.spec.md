# Rocket Management API Specification

## Problem Description

- As a **travel administrator**, I want to **create and manage rockets** so that I can keep the fleet inventory up to date.
- As a **travel administrator**, I want to **view all available rockets** so that I can plan and assign them to future missions.
- As a **travel administrator**, I want to **update or delete rockets** so that I can reflect changes in the fleet (e.g., decommissioned vehicles or capacity adjustments).

## Solution Overview

- Expose a RESTful CRUD API under `/rockets` that stores rocket data (name, range, capacity) in memory. No external database is required for this initial version. Standard HTTP methods (GET, POST, PUT, DELETE) map directly to list, create, update, and delete operations.

## Acceptance Criteria

- [ ] **WHEN** a POST request is made to `/rockets` with a valid name, range, and capacity, **THEN** the system shall create a new rocket and return it with a unique ID and HTTP 201.
- [ ] **WHEN** a GET request is made to `/rockets`, **THEN** the system shall return the list of all rockets with HTTP 200.
- [ ] **WHEN** a GET request is made to `/rockets/:id` for an existing rocket, **THEN** the system shall return that rocket with HTTP 200.
- [ ] **WHEN** a GET request is made to `/rockets/:id` for a non-existing rocket, **THEN** the system shall return HTTP 404.
- [ ] **WHEN** a PUT request is made to `/rockets/:id` with valid fields, **THEN** the system shall update the rocket and return the updated resource with HTTP 200.
- [ ] **WHEN** a DELETE request is made to `/rockets/:id` for an existing rocket, **THEN** the system shall remove it and return HTTP 204.
- [ ] **WHEN** a rocket is created or updated with a range value outside ("suborbital", "orbital", "moon", "mars"), **THEN** the system shall return HTTP 400 with a descriptive error message.
- [ ] **WHEN** a rocket is created or updated with a capacity outside the range 1–10, **THEN** the system shall return HTTP 400 with a descriptive error message.
- [ ] **WHEN** a rocket is created or updated without a name, **THEN** the system shall return HTTP 400 with a descriptive error message.
