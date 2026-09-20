# FBanco

Angular front end for the **Banco** backend (`../Backend_Banco`). It lets you manage clients, users, and account movements through the backend REST API.

**Stack:** Angular 21 · TypeScript · Angular SSR (Express) · HttpClient · Vitest

---

## Pages & Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `Inicio` | Home with links to each section |
| `/clientes` | `Clientes` | Client management |
| `/usuarios` | `Usuarios` | User management |
| `/movimientos` | `Movimientos` | Account movements |
| `**` | redirect → `/` | Wildcard fallback |

## Architecture

```
src/app/
├── pages/
│   ├── inicio/
│   ├── clientes/
│   ├── usuarios/
│   └── movimientos/
├── services/
│   ├── cliente.ts        # /api/Cliente  (list, by id, by DPI, create, update, status, delete)
│   ├── usuario.ts        # /api/Usuario  (list, by id, by login, create, update, status, password, delete)
│   └── movimiento.ts     # /api/Movimiento (list, by id, by account, create)
├── models/               # Cliente, Usuario, Movimiento interfaces
└── app.routes.ts         # Client-side route definitions
```

## Backend

The services call the API at `http://localhost:5164/api/...` (hard-coded in each service's `apiUrl`). Start the backend first and adjust the port if yours differs. The API needs PostgreSQL and MongoDB running locally; see [`classes/README.md`](../../README.md) for the backend endpoints.

> ⚠️ Not every call in the services has a matching endpoint in `Backend_Banco` yet (for example client lookup by DPI, client status toggle, and `GET` for movements exist in the `Backend_Banco_inge` variant). Check the backend you run against.

---

## Running the project

```bash
npm install        # Install dependencies
npm start          # Dev server at http://localhost:4200
npm run build      # Production build → dist/
npm test           # Run tests with Vitest
```
