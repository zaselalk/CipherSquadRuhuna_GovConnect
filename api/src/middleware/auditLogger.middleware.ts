import { Request, Response, NextFunction } from "express";
import { logAction } from "../util/logAction";

/**
 * Middleware to log actions for audit purposes.
 * Logs the user ID, action (HTTP method and URL), and request details.
 *
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next middleware function in the stack.
 */
export const auditLogger = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?.id || null; // Assuming `req.user` is populated by `serializeUser`
  const action = `${req.method} ${req.originalUrl}`;

  // skips urls
  // some URLs do not require logging, such as authentication endpoints,
  // this also helps to reduce noise in the logs and avoid logging sensitive information
  const skipUrls = [
    "/auth/login",
    "/auth/register",
    "/auth/logout",
    "/auth/forgot-password",
    "/auth/reset-password",
    "/auth/check",
  ];

  if (skipUrls.includes(req.originalUrl)) {
    return next();
  }

  const details = {
    body: req.body,
    params: req.params,
    query: req.query,
  };

  await logAction(userId, action, details); // strong consistency logging function
  next();
};
