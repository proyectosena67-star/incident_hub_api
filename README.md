# IncidentHub API

## Descripción y Problema Solucionado
Una organización cuenta con diferentes áreas de trabajo donde diariamente se presentan incidentes tecnológicos (computadores que no encienden, fallas de conectividad, problemas con impresoras, etc.). Actualmente, estas novedades se informan mediante llamadas, mensajes y conversaciones informales, lo que dificulta llevar un control y trazabilidad adecuados. 

**IncidentHub API** es una solución backend desarrollada para registrar, consultar, modificar, atender y eliminar incidentes tecnológicos de forma estructurada, centralizada y profesional mediante una API REST.

---

## Tecnologías Utilizadas
* **Node.js** - Entorno de ejecución.
* **Express** - Framework web para Node.js.
* **TypeScript** - Superconjunto de JavaScript que aporta tipado estático e interfaces.

---

## Instalación y Preparación (Clonar Repositorio)
Sigue estos pasos para clonar y preparar el proyecto en tu entorno local:

1. Abrir una PowerShell en una carpeta local del dispositivo o en el escritorio.
2. Clonar el repositorio:
   en la terminal:
   git clone https://github.com/proyectosena67-star/incident_hub_api.git
3. cd incidenthub-api
4. npm install
5. code .
6. npm install express
7. npm install -D tsx
8. npm install -D typescript @types/node @types/express ts-node-dev

## Ejecución del Proyecto
npm run dev


## 📌 Documentación de Endpoints

| Método | Ruta | Propósito | Restricción / Protección |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/incidents` | Consultar todos los incidentes | Público |
| **GET** | `/api/incidents/:id` | Consultar un incidente por ID | Público (ID válido requerido) |
| **POST** | `/api/incidents` | Registrar un nuevo incidente | Validación de DTO y reglas de negocio |
| **PUT** | `/api/incidents/:id` | Actualizar un incidente completo | Validación de ID y campos |
| **PATCH** | `/api/incidents/:id/status` | Cambiar el estado del incidente | Validación de transiciones permitidas |
| **DELETE** | `/api/incidents/:id` | Eliminar un incidente | **Protegido:** Requiere rol de Administrador (`instructor-token`) |
| **GET** | `/api/incidents/critical` | Retorna solo incidentes críticos | Público |
| **GET** | `/api/incidents/pending` | Retorna incidentes abiertos o en proceso | Público |
| **GET** | `/api/incidents/stats` | Resumen operacional y métricas | Público |

## Explicación de Middlewares
Los middlewares actúan como interceptores en el ciclo de vida de una petición HTTP:
logger: Registra en consola la fecha, hora y el método HTTP de cada petición entrante.requestInfo: Enriquece el objeto de la petición (req) agregando información útil de control (timestamp, método y ruta).
validateId: Verifica que el parámetro :id recibido en la URL sea estrictamente un número entero positivo.validateIncident / validatePriority / 
validateTime: Aseguran que la información enviada por el cliente cumpla con los tipos, rangos numéricos permitidos (ej. máximo 480 minutos, o 60 minutos si es crítico) y prioridades válidas antes de llegar al controlador.
auth: Verifica la existencia y validez del token de acceso en los encabezados (Bearer instructor-token o Bearer technician-token).
admin: Restringe el acceso a rutas sensibles (como DELETE) permitiendo el paso únicamente a tokens con privilegios de administrador.
notFoundMiddleware: Captura cualquier ruta inexistente y genera un error controlado 404.
errorMiddleware: Centraliza la captura de errores (AppError) transformándolos en respuestas JSON uniformes para el cliente.

## Diferencia entre Model y DTOModel 
(Incident): Representa cómo existe y se estructura el objeto de forma completa dentro de la aplicación y su capa de datos (incluyendo atributos autogenerados por el sistema como el id, el status inicial y la fecha createdAt).
DTO (CreateIncidentDto): Representa exclusivamente los datos permitidos y requeridos que el cliente puede enviar desde el exterior para una operación específica (por ejemplo, registrar un incidente), protegiendo al sistema para que el usuario no manipule directamente campos sensibles o internos como el identificador o el estado.

