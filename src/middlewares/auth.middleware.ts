import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app-error";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AppError(401, "Unauthorized: No token provided"));
  }
  const token = authHeader.split(" ")[1];
  if (token !== "instructor-token" && token !== "technician-token") {
    return next(new AppError(401, "Unauthorized: Invalid token"));
  }
  (req as any).userToken = token;
  next();
};