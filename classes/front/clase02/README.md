# Clase 02 – Multi-page Site Scaffold

Small multi-page Angular app used to practice creating standalone components per page and wiring them with client-side routing.

**Stack:** Angular 21 · TypeScript · Angular SSR (Express) · Vitest

---

## Pages & Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `Home` | Landing page |
| `/productos` | `Productos` | Products page |
| `/clientes` | `Clientes` | Clients page |
| `/contactos` | `Contactos` | Contact page |
| `**` | redirect → `/` | Wildcard fallback |

## Architecture

```
src/app/
├── pages/
│   ├── home/
│   ├── productos/
│   ├── clientes/
│   └── contactos/
├── app.routes.ts      # Route definitions
└── app.ts / app.html  # Root shell with navigation
```

---

## Running the project

```bash
npm install        # Install dependencies
npm start          # Dev server at http://localhost:4200
npm run build      # Production build → dist/
npm test           # Run tests with Vitest
```
