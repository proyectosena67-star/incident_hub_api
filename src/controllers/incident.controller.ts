import { Request, Response, NextFunction } from "express";
import { incidents } from "../data/incidents.data";
import { Incident } from "../models/incident.model";
import { CreateIncidentDto } from "../dtos/incident.dto";
import { AppError } from "../errors/app-error";

export const getIncidents = (req: Request, res: Response) => {
  res.status(200).json({
    ok: true,
    total: incidents.length,
    data: incidents
  });
};

export const getIncidentById = (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.id);
  const incident = incidents.find(i => i.id === id);
  if (!incident) {
    return next(new AppError(404, "Incident not found"));
  }
  res.status(200).json({ ok: true, data: incident });
};

export const createIncident = (req: Request, res: Response) => {
  const dto: CreateIncidentDto = req.body;
  const newIncident: Incident = {
    id: incidents.length > 0 ? incidents[incidents.length - 1].id + 1 : 1,
    ...dto,
    status: "OPEN",
    createdAt: new Date().toISOString()
  };
  incidents.push(newIncident);
  res.status(201).json({ ok: true, data: newIncident });
};

export const updateIncident = (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.id);
  const index = incidents.findIndex(i => i.id === id);
  if (index === -1) {
    return next(new AppError(404, "Incident not found"));
  }
  const { title, description, reporter, location, priority, estimatedMinutes } = req.body;
  incidents[index] = {
    ...incidents[index],
    title: title ?? incidents[index].title,
    description: description ?? incidents[index].description,
    reporter: reporter ?? incidents[index].reporter,
    location: location ?? incidents[index].location,
    priority: priority ?? incidents[index].priority,
    estimatedMinutes: estimatedMinutes ?? incidents[index].estimatedMinutes
  };
  res.status(200).json({ ok: true, data: incidents[index] });
};

export const updateIncidentStatus = (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.id);
  const incident = incidents.find(i => i.id === id);
  if (!incident) {
    return next(new AppError(404, "Incident not found"));
  }
  const { status } = req.body;
  if (!["OPEN", "IN_PROGRESS", "RESOLVED"].includes(status)) {
    return next(new AppError(400, "Invalid status value"));
  }

  // Reto 5: Validación de transiciones
  const current = incident.status;
  if (current === "RESOLVED" && (status === "OPEN" || status === "IN_PROGRESS")) {
    return next(new AppError(400, "Invalid status transition from RESOLVED"));
  }

  incident.status = status;
  res.status(200).json({ ok: true, data: incident });
};

export const deleteIncident = (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.id);
  const index = incidents.findIndex(i => i.id === id);
  if (index === -1) {
    return next(new AppError(404, "Incident not found"));
  }
  incidents.splice(index, 1);
  res.status(204).send();
};

// Retos adicionales (Critical, Pending, Stats)
export const getCriticalIncidents = (req: Request, res: Response) => {
  const critical = incidents.filter(i => i.priority === "CRITICAL");
  res.status(200).json({ ok: true, total: critical.length, data: critical });
};

export const getPendingIncidents = (req: Request, res: Response) => {
  const pending = incidents.filter(i => i.status === "OPEN" || i.status === "IN_PROGRESS");
  res.status(200).json({ ok: true, total: pending.length, data: pending });
};

export const getStats = (req: Request, res: Response) => {
  const total = incidents.length;
  const open = incidents.filter(i => i.status === "OPEN").length;
  const inProgress = incidents.filter(i => i.status === "IN_PROGRESS").length;
  const resolved = incidents.filter(i => i.status === "RESOLVED").length;
  const critical = incidents.filter(i => i.priority === "CRITICAL").length;
  const totalMinutes = incidents.reduce((acc, curr) => acc + curr.estimatedMinutes, 0);
  const averageEstimatedMinutes = total > 0 ? Math.round(totalMinutes / total) : 0;

  res.status(200).json({
    ok: true,
    data: { total, open, inProgress, resolved, critical, averageEstimatedMinutes }
  });
};