import AuditLog from "../models/audit-log";

/**
 * Logs an action to the audit log.
 *
 * @param userId - The ID of the user performing the action, or null if not applicable.
 * @param action - A string describing the action being logged.
 * @param details - An optional object containing additional details about the action.
 * @returns A promise that resolves when the log entry has been created.
 */
export const logAction = async (
  userId: number | null,
  action: string,
  details: Record<string, any> | null = null
): Promise<void> => {
  try {
    await AuditLog.create({
      userId,
      action,
      details,
    });
  } catch (error) {
    console.error("Failed to log action:", error);
  }
};
