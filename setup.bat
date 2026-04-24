@echo off
setlocal enabledelayedexpansion

REM Create src directory
if not exist "src" (
  mkdir src
  echo Created src directory
)

REM Create src/index.ts
(
  echo console.log("Hello from TypeScript!");
) > src\index.ts
echo Created src/index.ts

REM Install dependencies
call npm install

echo.
echo Setup complete! TypeScript Node.js app is ready.
echo.
echo Available commands:
echo  npm run dev   - Run with watch mode
echo  npm run build - Compile TypeScript
echo  npm start     - Run compiled app
