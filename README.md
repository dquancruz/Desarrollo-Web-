# 🌐 Web Development Repository

This repository contains my work throughout the Web Development course, organized into classes, academic tasks, exams, and projects. It also includes backend and front-end work from the related Mobile Applications course.

The course covers full-stack web development: Back-end with C# / ASP.NET Core, Front-end with Angular and React, API design, and database integration with SQL Server, PostgreSQL, and MongoDB.

## 📌 Topics Covered

- ⚙️ Back-end development with C# (.NET Core 3.1, .NET 8, and .NET 9)
- 🔗 RESTful API design with ASP.NET Core Web API
- 🏗️ Layered architecture: Controllers, Services, Interfaces, Models, DTOs (and the Web API + Core + Modelo solution layout)
- 🗄️ Data access with Dapper, SQL Server, and PostgreSQL
- 🍃 MongoDB audit trails / process logs alongside PostgreSQL
- 🐇 Asynchronous messaging with RabbitMQ (retry, DLQ, and parking queues)
- 📖 API documentation with Swagger
- 🎨 Front-end development with Angular 21 and TypeScript
- ⚛️ Front-end development with React 19, Vite, and React Router
- 🧩 Angular template syntax, components, services, routing, and `HttpClient`

---

## 🗂️ Repository Structure

```
.
├── classes/     # Work from class sessions (backend, front, mobile apps)
├── exams/       # Partial and final exams (APIs and front-ends)
├── projects/    # Course projects
└── tasks/       # Academic tasks
```

Each area has its own README with more detail: [classes](./classes/README.md) · [exams](./exams/README.md).

### 📚 Classes

Work developed during class sessions, organized by technology layer.

**⚙️ Backend**

| Folder | Stack | Description |
|--------|-------|-------------|
| [classes/backend/Clase2](./classes/backend/Clase2/) | C# · .NET Core 3.1 | 🦸 SuperHeroes & Villanos API |
| [classes/backend/Clase_7](./classes/backend/Clase_7/) | C# · .NET Core 3.1 | 👤 Clientes API |
| [classes/backend/Pre_Examen](./classes/backend/Pre_Examen/) | C# · .NET Core 3.1 | 📦 Inventory management API (Productos) — pre-exam practice |

**🎨 Frontend**

| Folder | Stack | Description |
|--------|-------|-------------|
| [classes/front/clase02](./classes/front/clase02/) | Angular 21 · TypeScript | 🧭 Multi-page site scaffold: Home, Productos, Clientes, Contactos with routing |
| [classes/front/clase2_Front](./classes/front/clase2_Front/) | Angular 21 · TypeScript | 🔤 Frontend basics: variables, functions, objects, arrays |
| [classes/front/clase_4_front](./classes/front/clase_4_front/) | Angular 21 · TypeScript | 🧩 Components, services, routing, and Angular pipes |
| [classes/front/clase_6](./classes/front/clase_6/) | Angular 21 · TypeScript | ⚡ Pokémon search app consuming PokeAPI with HttpClient |
| [classes/front/PreExamenParcialFront](./classes/front/PreExamenParcialFront/) | Angular 21 · TypeScript | 🛒 NexoCommerce — multi-page e-commerce landing with routing |

**📱 Aplicaciones Móviles**

| Folder | Stack | Description |
|--------|-------|-------------|
| [classes/aplicaciones-mobiles/Backend_Banco](./classes/aplicaciones-mobiles/Backend_Banco/) | C# · .NET 9 · PostgreSQL · MongoDB | 🏦 Banco backend API: Usuarios, Clientes, and Movimientos |
| [classes/aplicaciones-mobiles/Backend_Banco_inge](./classes/aplicaciones-mobiles/Backend_Banco_inge/) | C# · .NET 9 · PostgreSQL · MongoDB · RabbitMQ | 🐇 Banco backend variant with payment-request queueing via RabbitMQ |
| [classes/aplicaciones-mobiles/FBanco](./classes/aplicaciones-mobiles/FBanco/) | Angular 21 · TypeScript | 💻 Front end for the Banco backend (Clientes, Usuarios, Movimientos) |

### 📝 Academic Tasks

| Task | Description |
|------|-------------|
| [Task 01 – Git Essay](./tasks/task-01-git-essay/ensayo-git.md) | 🐙 Essay on Git, version control, and essential workflows |

### 📋 Exams

| Exam | Stack | Description |
|------|-------|-------------|
| [Partial Exam (Web Dev 1)](./exams/Examen_Parcial_DesarrolloWeb1/) | C# · .NET Core 3.1 | 📅 Reservations management API |
| [Final Exam (Web Dev 1)](./exams/Examen_Final_DesarrolloWeb1/) | C# · .NET 8 | 🎪 Events and inscriptions management API |
| [Examen Parcial – Pedidos](./exams/Examen_Parcial/) | C# · .NET 9 · PostgreSQL · MongoDB | 📦 Orders REST API with a MongoDB audit trail |
| [Examen Hotel](./exams/Examen_Hotel/) | C# · .NET 9 · PostgreSQL · MongoDB | 🏨 Hotel room reservations API with a MongoDB audit trail |
| [ExploraGT](./exams/ExploraGT/) | Angular 21 · TypeScript | 🇬🇹 Guatemala tourism destination browser with category filtering |
| [Motofix](./exams/motofix/) | Angular 21 · TypeScript | 🏍️ Motorcycle workshop landing page with a clients list from a public API |

### 🚀 Projects

| Project | Stack | Description |
|---------|-------|-------------|
| [Sales System with Stock Control](./projects/ProyectoSistemaDeVentasConControlDeStock/) | C# · .NET 8 · PostgreSQL | 🛒 Full sales and inventory management API |
| [Countries of the World](./projects/CountriesOfTheWorld/) | React 19 · Vite · TypeScript | 🌍 Country explorer consuming the REST Countries API |

---

## 🚀 Getting Started

**Backend projects (.NET)** — open the `.sln` / `.slnx` in Visual Studio, or from the solution folder:

```bash
dotnet restore
dotnet run --project <WebApiProject>/<WebApiProject>.csproj
```

Swagger UI is exposed at `/swagger` in development. Projects that use PostgreSQL or MongoDB need those services running locally; check each project's `appsettings.json` (or its `appsettings.example.json`) for connection strings.

**Frontend projects (Angular / React)**

```bash
npm install
npm start          # Angular: ng serve  (React/Vite: npm run dev)
npm run build
```

> 🔐 Files that hold local credentials (for example `exams/Examen_Hotel/Examen_Hotel/appsettings.json`) are gitignored. Copy the `appsettings.example.json` template next to it and fill in your own values.
