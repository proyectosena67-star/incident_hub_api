import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app-error";

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = (req as any).userToken;
  if (token !== "instructor-token") {
    return next(new AppError(403, "Forbidden: Admins only"));
  }
  next();
};