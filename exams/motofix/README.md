# Motofix

Landing page for a fictional motorcycle workshop, plus a clients list loaded from a public API. Built as a front-end exam.

**Stack:** Angular 21 · TypeScript · SCSS · HttpClient · Vitest

---

## Pages & Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | redirect → `/home` | Default route |
| `/home` | `Home` | Landing page with in-page sections: Inicio, Nosotros, Servicios, Ubicación, Horarios, Contacto |
| `/clients` | `Clients` | Clients list with search, loading, and error/retry states |
| `**` | redirect → `/home` | Wildcard fallback |

## Architecture

```
src/app/
├── home/                 # Landing page (smooth scroll to sections, mobile menu)
├── clients/              # Clients list (search + loading/error states)
├── services/
│   └── users.ts          # UsersService + User / Client interfaces
├── app-module.ts         # NgModule (non-standalone components)
└── app-routing-module.ts # Route definitions
```

## Data source

`UsersService.getClients()` calls `https://jsonplaceholder.typicode.com/users` and maps each user into a `Client` view model: capitalized name, lower-cased e-mail, phone without extension, company name, and initials.

---

## Running the project

```bash
npm install        # Install dependencies
npm start          # Dev server at http://localhost:4200
npm run build      # Production build → dist/
npm test           # Run tests with Vitest
```
