# Changelog

All notable changes to this project will be documented in this file.

## [1.1.0] - 2026-04-24

### Added

- Rockets CRUD API under `/rockets` endpoint
- `GET /rockets` — list all rockets
- `GET /rockets/:id` — get a rocket by ID (404 if not found)
- `POST /rockets` — create a rocket (name, range, capacity)
- `PUT /rockets/:id` — update a rocket partially
- `DELETE /rockets/:id` — remove a rocket (204)
- Input validation: name required, range must be one of `suborbital | orbital | moon | mars`, capacity between 1–10
- E2E Playwright tests covering all 9 acceptance criteria

## [1.0.0] - Initial release

- Initial project setup with Express + TypeScript
- Health check endpoint at `/health`
