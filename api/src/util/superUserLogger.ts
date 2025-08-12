// src/util/superUserLogger.ts
import fs from "fs";

export function logSuperUserAction({
  userId,
  action,
}: {
  userId: string | number;
  action: string;
}) {
  const logEntry = `[${new Date().toISOString()}] userId=${userId} action=${action}\n`;
  // You can change this to a persistent log file if needed
  fs.appendFileSync("super_user_security.log", logEntry);
  console.log(logEntry);
}
