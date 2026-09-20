# 🌍 Countries of the World

Country explorer built with React that consumes the [REST Countries](https://restcountries.com/) API. The home page lists countries with their flag, name, and region, and lets you search by name and filter by region; each country has a detail page.

**Stack:** React 19 · TypeScript · Vite · React Router 7 · CSS Modules

---

## Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | `HomePage` | Country grid with search box, region filter, and light/dark theme toggle |
| `/country/:cca3` | `DetailPage` | Full country information, including clickable border countries |
| `*` | `NotFoundPage` | Fallback for unknown routes |

> The assignment also asks for a favorites/statistics route; it is not implemented yet.

## Architecture

```
src/
├── api/countries.ts        # REST Countries client (paginated fetch, ApiError)
├── hooks/                  # useCountries, useCountry, useBorderCountries, useFilteredCountries, useTheme
├── components/             # Header, SearchBar, RegionFilter, CountryCard, BorderBadge, LoadingGrid, ErrorMessage
├── pages/                  # HomePage, DetailPage, NotFoundPage
├── types/                  # Country and theme types
└── App.tsx / main.tsx      # Router setup
```

- Loading (skeleton grid) and error states are handled for every request.
- The theme defaults to the OS preference and is persisted in `localStorage`.

## Configuration

The API client sends a bearer token, read from an environment variable. Create a `.env.local` file in this folder (it is not committed):

```bash
VITE_API_TOKEN=<your REST Countries API token>
```

## Running the project

```bash
npm install
npm run dev        # Dev server (Vite)
npm run build      # Type-check + production build → dist/
npm run lint       # ESLint
```

---

## Enunciado del Proyecto
Desarrollo de una Aplicación Web Integrada con API Externa
Deberá diseñar e implementar una aplicación web funcional utilizando el framework y las
tecnologías vistas en clase.

La aplicación deberá consistir en un Explorador de Países del Mundo, donde los usuarios
puedan consultar información detallada sobre diferentes países. La página principal deberá
mostrar una lista de países obtenida desde una API pública externa. Cada elemento de la lista
deberá presentar información básica, como el nombre del país, su bandera y su región
geográfica. Adicionalmente, deberá incluir un cuadro de búsqueda y filtros que permitan
localizar países específicos por nombre o continente.

El sistema deberá implementar un esquema de rutas para facilitar la navegación entre las
diferentes vistas de la aplicación. Como mínimo, deberá existir una ruta principal que muestre
el listado general de países, una ruta de detalle que permita visualizar información completa de
un país seleccionado y una ruta adicional destinada a mostrar estadísticas o países favoritos
seleccionados por el usuario.

En cuanto al manejo de listas, el proyecto deberá consumir la información proveniente de la
API y desplegarla dinámicamente utilizando estructuras iterativas del framework utilizado. El
listado deberá actualizarse automáticamente según las búsquedas o filtros aplicados.

Para el consumo de servicios externos, deberán utilizar la API pública REST Countries, la cual
proporciona información actualizada sobre los países del mundo. Entre los datos que deberán
mostrar se encuentran: nombre oficial del país, bandera, capital, población, idiomas, moneda,
continente y enlace al mapa geográfico. El consumo deberá realizarse mediante solicitudes
HTTP y deberá implementarse un adecuado manejo de errores en caso de fallos de conexión o
respuestas inválidas.

## La API recomendada para el proyecto es la siguiente:

``` bash
● REST Countries API:
https://restcountries.com/
Algunos ejemplos de endpoints que podrán utilizar son:
● Obtener todos los países:
https://api.restcountries.com/countries/v5
● Buscar un país por nombre:
https://api.restcountries.com/countries/v5/name?q=guatemala
● Filtrar países por región
https://api.restcountries.com/countries/v5/region/europe
https://api.restcountries.com/countries/v5/region/asia
https://api.restcountries.com/countries/v5/region/africa
https://api.restcountries.com/countries/v5/region/oceania
```