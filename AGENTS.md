# Agents Instructions

## Product Overview
- AstroBookings is a demo REST API for rocket bookings management.
- It exposes CRUD endpoints under /rockets and a /health endpoint.
- It is used as course material for AI-assisted programming.

## Technical Implementation

### Tech Stack
- Language: **TypeScript 5.x on Node.js 20+ types**
- Framework: **Express 4.18.x**
- Database: **In-memory Map store (no external DB)**
- Security: **Input validation in routes and JSON body parsing**
- Testing: **Playwright Test 1.40.x**
- Logging: **Node console logging**

### Development workflow
```bash
# Set up the project
npm install

# Build/Compile the project
npm run build

# Run the project
npm run dev
# or
npm start

# Test the project
npm test

# Deploy the project
npm run build && npm start
```

### Folder structure
```text
.                         # Project root
|-- AGENTS.md             # This file with instructions for AI agents
|-- README.md             # The main human documentation file
|-- package.json          # Scripts and dependencies
|-- playwright.config.ts  # Playwright setup and web server config
|-- src/                  # API source code
|   |-- index.ts          # Express app entrypoint
|   \-- rockets/          # Rockets domain (router, types, repository)
|-- tests/                # API tests with Playwright
|-- specs/                # Markdown specs for acceptance criteria
|-- dist/                 # TypeScript build output
|-- setup.js              # Optional setup helper script
\-- setup.bat             # Windows setup helper script
```

## Environment
- Code and documentation must be in English.
- Chat responses must be in the language of the user prompt.
- Sacrifice grammar for conciseness in responses.
- This is a windows environment using git bash terminal.
- My default branch is `main`.
