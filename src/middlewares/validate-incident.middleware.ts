import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app-error";

export const validateIncident = (req: Request, res: Response, next: NextFunction) => {
  const { title, description, reporter, location, priority, estimatedMinutes } = req.body;
  if (!title || !description || !reporter || !location || !priority || estimatedMinutes === undefined) {
    return next(new AppError(400, "Missing required fields"));
  }

  // Validación de prioridad
  const validPriorities = ["LOW", "MEDIUM", "HIGH", "CRITICAL"];
  if (!validPriorities.includes(priority)) {
    return next(new AppError(400, "Invalid priority value"));
  }

  // Validación de tiempo
  if (typeof estimatedMinutes !== "number" || estimatedMinutes <= 0 || estimatedMinutes > 480) {
    return next(new AppError(400, "Invalid estimated minutes"));
  }

  // Reto 4: Si es CRITICAL no puede superar 60 min
  if (priority === "CRITICAL" && estimatedMinutes > 60) {
    return next(new AppError(400, "Critical incidents cannot exceed 60 minutes"));
  }

  next();
};