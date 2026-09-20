# Web Development Exams

This folder contains practical exams for the Web Development course. Each exam evaluates the ability to design and implement a REST API (or a front-end app) under time-constrained conditions.

| Exam | Stack | Folder |
|------|-------|--------|
| Partial Exam — Reservations API | C# · .NET Core 3.1 · SQL Server | [`Examen_Parcial_DesarrolloWeb1/`](./Examen_Parcial_DesarrolloWeb1/) |
| Final Exam — Events & Inscriptions API | C# · .NET 8 · SQL Server | [`Examen_Final_DesarrolloWeb1/`](./Examen_Final_DesarrolloWeb1/) |
| Examen Parcial — Orders API | C# · .NET 9 · PostgreSQL · MongoDB | [`Examen_Parcial/`](./Examen_Parcial/) |
| Examen Hotel — Room Reservations API | C# · .NET 9 · PostgreSQL · MongoDB | [`Examen_Hotel/`](./Examen_Hotel/) |
| ExploraGT — Tourism browser | Angular 21 · TypeScript | [`ExploraGT/`](./ExploraGT/) |
| Motofix — Workshop landing page | Angular 21 · TypeScript | [`motofix/`](./motofix/) |

The `.sql` files in this folder (`QueryExamenParcial.sql`, `Query_Examen_Final_DesarrolloWeb1.sql`) are the database scripts for the first two exams.

---

## Partial Exam — Reservations API

**Path:** `Examen_Parcial_DesarrolloWeb1/`
**Stack:** C# · .NET Core 3.1 · ASP.NET Core Web API · Dapper · SQL Server · Swagger

REST API for managing reservations, built with layered architecture.

**Architecture:**
- `Controllers/` — `ControladorReserva`
- `Services/` — `ServicioReserva`
- `Interfaces/` — `IReserva`
- `Models/` — `ModeloReserva`
- `DTOs/` — `CrearReservaDTO`, `ActualizarReservaDTO`

**Endpoints:**

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/ControladorReserva/Obtener Todos` | List all reservations |
| POST | `/api/ControladorReserva/Crear Reserva` | Create a reservation |
| PUT | `/api/ControladorReserva/Actualizar Reserva` | Update a reservation |

---

## Examen Parcial — Orders API (Pedidos)

**Path:** `Examen_Parcial/` · full details in its [README](./Examen_Parcial/README.md)
**Stack:** C# · .NET 9 · ASP.NET Core Web API · Dapper · PostgreSQL · MongoDB · Swagger

REST API to register, query, update, and delete orders. Follows the Web API + Core + Modelo layout of `Backend_Banco`; every create (POST) and update (PUT) also writes an audit document to MongoDB (`Pedido_Historial`).

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/Api/Pedido/ObtenerTodos` | List all orders |
| GET | `/Api/Pedido/{id}` | Get an order by ID |
| POST | `/Api/Pedido/Ingresar` | Register an order (Postgres + Mongo) |
| PUT | `/Api/Pedido/{id}` | Update an order (Postgres + Mongo) |
| DELETE | `/Api/Pedido/{id}` | Delete an order |

---

## Examen Hotel — Room Reservations API

**Path:** `Examen_Hotel/` · full details in its [README](./Examen_Hotel/README.md)
**Stack:** C# · .NET 9 · ASP.NET Core Web API · Dapper · PostgreSQL · MongoDB · Swagger

REST API to manage hotel room reservations, built on the same architecture as `Examen_Parcial`. Business rules: a reservation requires an available room, the total is computed as `nights × nightly price`, the room flips to `OCUPADA` on creation and back to `DISPONIBLE` when the reservation is deleted. POST, PUT, and DELETE each write an audit document to MongoDB (`Reserva_Historial`).

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/Api/Reserva/ObtenerTodos` | List all reservations |
| GET | `/Api/Reserva/{id}` | Get a reservation by ID |
| POST | `/Api/Reserva/Ingresar` | Register a reservation (Postgres + Mongo) |
| PUT | `/Api/Reserva/{id}` | Update a reservation (Postgres + Mongo) |
| DELETE | `/Api/Reserva/{id}` | Delete a reservation and free the room |

> 🔐 `Examen_Hotel/Examen_Hotel/appsettings.json` is gitignored; copy `appsettings.example.json` and set your local Postgres password.

---

## Final Exam — Events & Inscriptions API

**Path:** `Examen_Final_DesarrolloWeb1/`
**Stack:** C# · .NET 8 · ASP.NET Core Web API · SQL Server · Swagger

REST API for an event management platform with inscriptions, movement history, and alerts.

**Architecture:**
- `Controllers/` — `EventoController`, `PersonaController`, `InscripcionController`
- `Services/` — `EventoService`, `PersonaService`, `InscripcionService`
- `Interfaces/` — `IEventoService`, `IPersonaService`, `IInscripcionService`
- `Models/` — `eventosModel`, `PersonaModel`, `InscripcionesModel`, `Historial_MovimientosModel`, `AlertasModel`
- `DTOs/` — `InscripcionDTO`

**Modules:**

| Module | Description |
|--------|-------------|
| Personas | People registered in the system |
| Eventos | Events that can be created and listed |
| Inscripciones | Registrations linking people to events |
| Historial de Movimientos | Audit trail of system changes |
| Alertas | Automated alerts for system events |

---

## Final Exam — ExploraGT (Front-end)

**Path:** `ExploraGT/`
**Stack:** Angular 21 · TypeScript · Angular SSR (Express) · Vitest

Single-page Angular application for browsing Guatemalan tourism destinations. Built as a front-end final exam.

**Architecture:**
- `src/app/components/destino-card/` — reusable card component showing image, location, rating, and badges
- `src/app/services/destinos.service.ts` — in-memory data service providing all destinations
- `src/app/interfaces/destino-turistico.interface.ts` — `DestinoTuristico` interface
- `app.html` — root shell: hero header, category filter bar, destination grid, footer

**Features:**

| Feature | Description |
|---------|-------------|
| Category filter | Filter buttons for Arqueológico, Natural, Colonial, Gastronómico, Aventura |
| Destination cards | Image, name, location, description, star rating, "Destacado" badge |
| Reactive count | Shows number of destinations matching the active filter |
| Static data | 10+ pre-loaded Guatemalan destinations (Tikal, Lago de Atitlán, etc.) |

---

## Motofix (Front-end)

**Path:** `motofix/`
**Stack:** Angular 21 · TypeScript · SCSS · HttpClient · Vitest

Landing page for a fictional motorcycle workshop plus a clients list.

**Architecture:**
- `home/` — landing page with in-page sections (Inicio, Nosotros, Servicios, Ubicación, Horarios, Contacto)
- `clients/` — clients list with search, loading and error states
- `services/users.ts` — `UsersService` fetching `https://jsonplaceholder.typicode.com/users` and mapping them to `Client` view models (formatted name, e-mail, phone, company, initials)
- `app-routing-module.ts` — routes `/home`, `/clients`, wildcard redirect to `/home`

---

## Skills Evaluated

- Layered architecture (Controllers, Services, Interfaces, Models, DTOs)
- RESTful API design and correct HTTP verb usage
- Dependency injection in ASP.NET Core
- Data access with Dapper, SQL Server, and PostgreSQL
- Multi-store persistence: PostgreSQL for data, MongoDB for audit trails
- Consuming external HTTP APIs from Angular services
- Angular components, services, and reactive template patterns
- Problem-solving under time constraints
