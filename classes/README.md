# 📚 Classes

This folder contains work developed during class sessions, organized by course and technology layer: **backend**, **frontend**, and **aplicaciones-mobiles**.

| Folder | Stack | Description |
|--------|-------|-------------|
| [backend/Clase2](./backend/Clase2/) | C# · .NET Core 3.1 | 🦸 SuperHeroes & Villanos API |
| [backend/Clase_7](./backend/Clase_7/) | C# · .NET Core 3.1 | 👤 Clientes API |
| [backend/Pre_Examen](./backend/Pre_Examen/) | C# · .NET Core 3.1 | 📦 Inventory management API (Productos) |
| [front/clase02](./front/clase02/) | Angular 21 · TypeScript | 🧭 Multi-page site scaffold: Home, Productos, Clientes, Contactos with routing |
| [front/clase2_Front](./front/clase2_Front/) | Angular 21 · TypeScript | 🔤 Frontend basics: variables, functions, objects, arrays |
| [front/clase_4_front](./front/clase_4_front/) | Angular 21 · TypeScript | 🧩 Components, services, routing, and Angular pipes |
| [front/clase_6](./front/clase_6/) | Angular 21 · TypeScript | ⚡ Pokémon search app consuming PokeAPI with HttpClient |
| [front/PreExamenParcialFront](./front/PreExamenParcialFront/) | Angular 21 · TypeScript | 🛒 NexoCommerce — multi-page e-commerce landing with routing |
| [aplicaciones-mobiles/Backend_Banco](./aplicaciones-mobiles/Backend_Banco/) | C# · .NET 9 · PostgreSQL · MongoDB | 🏦 Banco backend API: Usuarios, Clientes, and Movimientos |
| [aplicaciones-mobiles/Backend_Banco_inge](./aplicaciones-mobiles/Backend_Banco_inge/) | C# · .NET 9 · PostgreSQL · MongoDB · RabbitMQ | 🐇 Banco backend variant with payment-request queueing via RabbitMQ |
| [aplicaciones-mobiles/FBanco](./aplicaciones-mobiles/FBanco/) | Angular 21 · TypeScript | 💻 Front end for the Banco backend (Clientes, Usuarios, Movimientos) |

---

## ⚙️ Backend

### 🦸 Clase 2 – SuperHeroes & Villanos API

**Path:** `backend/Clase2/`
**Stack:** C# · .NET Core 3.1 · ASP.NET Core Web API · Dapper · SQL Server · Swagger

REST API managing superheroes and villains with full CRUD operations.

**🏗️ Architecture:**
- `Controllers/` — `SuperHeroeController`, `VillanoController`
- `Services/` — `ServicioSuperHeroe`, `ServicioVillano`
- `Interfaces/` — `IServicioSuperHeroe`, `IServicioVillano`
- `Models/` — `SuperHeroe`, `Villano`
- `DTOs/` — `VillanoBuscarPorIdDto`, `VillanoCreateDto`

---

### 👤 Clase 7 – Clientes API

**Path:** `backend/Clase_7/`
**Stack:** C# · .NET Core 3.1 · ASP.NET Core Web API · Dapper · SQL Server

REST API for customer management.

**🏗️ Architecture:**
- `Controllers/` — `ClienteController`
- `Servicio/` — `ClienteServicio`
- `Interfaz/` — `IClienteServicio`
- `Modelo/` — `Cliente`

---

### 📦 Pre-Exam – Inventario API

**Path:** `backend/Pre_Examen/`
**Stack:** C# · .NET Core 3.1 · ASP.NET Core Web API · Dapper · SQL Server · Swagger

Inventory management API built as pre-exam practice. Manages products with CRUD operations.

**🏗️ Architecture:**
- `Controllers/` — `InventarioController`
- `Services/` — `ServicioInventario`
- `Interfaces/` — `IServicioInventario`
- `Models/` — `Producto`
- `DTOs/` — `ProductoCrearPorDto`, `ProductoPorIdDto`

**Endpoints:**

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/Inventario/obtener-todos` | List all products |
| GET | `/api/Inventario/obtener-por-id/{id}` | Get product by ID |
| POST | `/api/Inventario/obtener-por-id-body` | Get product by ID (body) |
| POST | `/api/Inventario/crear-producto` | Create a product |

---

## 🎨 Frontend

### 🧭 Clase 02 – Multi-page Site Scaffold

**Path:** `front/clase02/`
**Stack:** Angular 21 · TypeScript · Angular SSR (Express) · Vitest

Scaffold of a small multi-page Angular app with a standalone component per page and client-side routing.

**🏗️ Architecture:**
- `pages/home/`, `pages/productos/`, `pages/clientes/`, `pages/contactos/` — page components
- `app.routes.ts` — routes `/`, `/productos`, `/clientes`, `/contactos`, with a wildcard redirect to `/`

---

### 🔤 Clase 2 – Angular Basics

**Path:** `front/clase2_Front/`
**Stack:** Angular 21 · TypeScript · Angular SSR (Express) · Vitest

Practice project covering Angular fundamentals: template interpolation, functions, objects, and arrays.

**🧠 Concepts covered:**

| Section | What it demonstrates |
|---------|---------------------|
| 📌 Variables | Binding `nombre`, `apellido`, `titulo` to the template |
| ➕ Operations | Inline arithmetic in templates |
| ⚡ Functions | `DuplicarNumero`, `SumarNumeros`, `ConcatenarNombres` |
| 🎬 Object | Single `pelicula` object with title, date, and price |
| 🎬 Array – Movies | `arregloPelicula` rendered with `@for` loop |
| 🎮 Array – Games | `arregloVideojuego` with images, dates, and prices |

---

### 🧩 Clase 4 – Components, Services & Routing

**Path:** `front/clase_4_front/`
**Stack:** Angular 21 · TypeScript · Angular SSR (Express) · Vitest

Practice project introducing Angular components, services, and client-side routing.

**🏗️ Architecture:**
- `peliculas/` — feature module for movies
  - `PeliculasService` — data service with `Pelicula` interface and `getPelicula(id)` method
  - `listado-peliculas/` — component listing all movies with `CurrencyPipe` and `DatePipe`
  - `detalle-pelicula/` — component showing a single movie's detail
- `app.routes.ts` — client-side routing configuration

---

### ⚡ Clase 6 – Pokémon Search App

**Path:** `front/clase_6/`
**Stack:** Angular 21 · TypeScript · Angular SSR (Express) · HttpClient

Single-page app that queries the public [PokeAPI](https://pokeapi.co/) by name or number and renders a Pokémon detail card.

**🧠 Concepts covered:**

| Concept | Usage |
|---------|-------|
| `HttpClient` | `GET` request to PokeAPI REST endpoint |
| Two-way binding | `[(ngModel)]` on the search input |
| Control flow | `@if` for loading/error/result states; `@for` for types, stats, abilities |
| Lifecycle hooks | `ngOnInit` to load a default Pokémon on startup |
| Inline helpers | `formatId`, `getTypeColor`, `getStatColor`, `getStatName` |

---

### 🛒 Pre-Exam Front – NexoCommerce

**Path:** `front/PreExamenParcialFront/`
**Stack:** Angular 21 · TypeScript · Angular SSR (Express) · Angular Router

Multi-page e-commerce landing for a fictional platform called **NexoCommerce**. Built as front-end pre-exam practice.

**🏗️ Architecture:**
- `pages/home/` — marketing landing with hero, services, about, and contact sections
- `pages/products/` — product catalogue with search and category filtering
- `pages/offers/` — dedicated offers page
- `components/navbar/` — shared navigation bar with transparent mode
- `services/products.service.ts` — product data service
- `models/` — product interface and data models
- `app.routes.ts` — client-side routing (`/`, `/productos`, `/ofertas`)

---

## 📱 Aplicaciones Móviles

### 🏦 Backend Banco – Usuarios, Clientes & Movimientos API

**Path:** `aplicaciones-mobiles/Backend_Banco/`
**Stack:** C# · .NET 9 · ASP.NET Core Web API · Dapper · PostgreSQL (Npgsql) · MongoDB · Swagger

Backend API built as the server side for a mobile banking app: full CRUD plus status/password management for users, client (Cliente) management, and registration of account movements.

**🏗️ Architecture:**
- `Backend_Banco/` — Web API project, `Controllers/UsuarioController`, `Controllers/ClienteController`, `Controllers/MovimientoController`
- `Core/` — `Servicios/` + `Interfaz/` for `Usuario`, `Cliente`, and `Movimiento`
- `Modelo/` — `Modelos/MUsuario`, `MCliente`, `MMovimiento`, `MMovimientoMongo`
- `database/schema.sql` — PostgreSQL schema for the `ENTIDAD_BANCARIA` database

**Endpoints — Usuario (`/api/Usuario`):**

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/ObtenerTodos` | List all users |
| GET | `/{id}` | Get user by ID |
| GET | `/usuario/{usuario}` | Get user by login |
| POST | `/` | Create a user |
| PUT | `/{id}` | Update a user |
| PATCH | `/{id}/estado` | Toggle a user's status |
| PATCH | `/{id}/password` | Change a user's password |
| DELETE | `/{id}` | Delete a user |

**Endpoints — Cliente (`/Api/Cliente`):**

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/ObtenerTodos` | List all clients |
| GET | `/{id}` | Get client by ID |
| POST | `/Ingresar` | Register a client |
| PUT | `/{id}` | Update a client |
| DELETE | `/{id}` | Delete a client |

**Endpoints — Movimiento (`/Api/Movimiento`):**

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/` | Register a movement (tracked in the MongoDB `Movimiento_Proceso` collection) |

> ℹ️ In this version the movement's PostgreSQL `INSERT` is commented out in `MovimientoServicio`, so only the MongoDB process record is written.

**Configuration:** connection strings (`DefaultConnection` for PostgreSQL, `MongoDB`) live in `Backend_Banco/appsettings.json`.

---

### 🐇 Backend Banco (inge) – RabbitMQ variant

**Path:** `aplicaciones-mobiles/Backend_Banco_inge/`
**Stack:** C# · .NET 9 · ASP.NET Core Web API · Dapper · PostgreSQL · MongoDB · RabbitMQ

Extended copy of the Banco backend used for the software-engineering course. Beyond `Usuario` and `Cliente`, it adds:

- **`MovimientoController`** (`/api/Movimiento`) — `GET` all, `GET /{idMovimiento}`, `GET /cuenta/{idCuenta}`, and `POST`.
- **RabbitMQ publisher** (`Core/Servicios/RabbitMQServicio`) — enqueues payment requests (`IRabbitMQ.EncolarSolicitudPago`) on a topic exchange (`solicitud.exchange`) with queues for the main flow, retry, dead-letter (DLQ), and parking.
- **Mongo message log** — payment messages are tracked in the `PAGOS` MongoDB database with an `EstadoProceso` field (default `PENDIENTE`).
- `Modelo/Modelos/SolicitudPagoMensaje` — message envelope (`EventId`, `EventType`, `Version`, `CorrelationId`, `Sequence`, `IdSolicitudPago`).

RabbitMQ connection settings are read from the `RabbitMQ:Host`, `RabbitMQ:Puerto`, `RabbitMQ:Usuario`, and `RabbitMQ:Password` configuration keys.

---

### 💻 FBanco – Angular front end for the Banco API

**Path:** `aplicaciones-mobiles/FBanco/`
**Stack:** Angular 21 · TypeScript · Angular SSR (Express) · Vitest · HttpClient

Admin-style front end that consumes the Banco backend at `http://localhost:5164/api`.

**🏗️ Architecture:**
- `pages/inicio/` — home with links to the three sections
- `pages/clientes/`, `pages/usuarios/`, `pages/movimientos/` — one page per resource
- `services/cliente.ts`, `usuario.ts`, `movimiento.ts` — `HttpClient` services for each API resource
- `models/` — `Cliente`, `Usuario`, `Movimiento` interfaces
- `app.routes.ts` — routes `/`, `/clientes`, `/usuarios`, `/movimientos`, with a wildcard redirect to `/`

---

## 🖥️ Scripts (Frontend projects)

```bash
npm start          # Dev server (ng serve)
npm run build      # Production build
npm test           # Run tests with Vitest
```
