import { Incident } from "../models/incident.model";

export const incidents: Incident[] = [
    {
        id: 1,
        title: "Proyector sin señal",
        description: "El proyector no reconoce ningún computador conectado.",
        reporter: "Carlos Díaz",
        location: "Aula 201",
        priority: "MEDIUM",
        status: "OPEN",
        estimatedMinutes: 30,
        createdAt: new Date().toISOString()
    },
    {
        id: 2,
        title: "Falla de red en oficina",
        description: "Pérdida intermitente de paquetes.",
        reporter: "Sofía Pérez",
        location: "Oficina 102",
        priority: "HIGH",
        status: "OPEN",
        estimatedMinutes: 45,
        createdAt: new Date().toISOString()
    },
    {
        id: 3,
        title: "Impresora sin tóner",
        description: "Falta consumible.",
        reporter: "Andrés Ruiz",
        location: "Recepción",
        priority: "LOW",
        status: "OPEN",
        estimatedMinutes: 15,
        createdAt: new Date().toISOString()
    },
    {
        id: 4,
        title: "Bloqueo de cuenta",
        description: "El usuario olvidó su contraseña.",
        reporter: "Lucía Méndez",
        location: "Virtual",
        priority: "MEDIUM",
        status: "IN_PROGRESS",
        estimatedMinutes: 20,
        createdAt: new Date().toISOString()
    },
    {
        id: 5,
        title: "Caída del servidor de autenticación",
        description: "El servicio central no responde.",
        reporter: "Equipo Sistemas",
        location: "Centro de Datos",
        priority: "CRITICAL",
        status: "OPEN",
        estimatedMinutes: 50,
        createdAt: new Date().toISOString()
    }
];