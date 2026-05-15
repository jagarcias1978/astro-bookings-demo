export type LogContext =
  | "app"
  | "http"
  | "health"
  | "rockets-route"
  | "rockets-repo"
  | "error";

type LogMeta = Record<string, number | string | boolean | null | undefined>;

function formatMeta(meta?: LogMeta): string {
  if (!meta) {
    return "";
  }

  const entries = Object.entries(meta).filter(([, value]) => value !== undefined);
  if (entries.length === 0) {
    return "";
  }

  const serialized = entries.map(([key, value]) => `${key}=${String(value)}`).join(" ");
  return ` ${serialized}`;
}

function writeLog(level: "INFO" | "WARN" | "ERROR", context: LogContext, message: string, meta?: LogMeta): void {
  const timestamp = new Date().toISOString();
  const line = `[${timestamp}] [${level}] [${context}] ${message}${formatMeta(meta)}`;

  if (level === "ERROR") {
    console.error(line);
    return;
  }

  if (level === "WARN") {
    console.warn(line);
    return;
  }

  console.log(line);
}

export function logInfo(context: LogContext, message: string, meta?: LogMeta): void {
  writeLog("INFO", context, message, meta);
}

export function logWarn(context: LogContext, message: string, meta?: LogMeta): void {
  writeLog("WARN", context, message, meta);
}

export function logError(context: LogContext, message: string, meta?: LogMeta): void {
  writeLog("ERROR", context, message, meta);
}