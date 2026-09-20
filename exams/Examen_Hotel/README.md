# Examen Hotel - API de Reservas de Habitaciones

API REST en ASP.NET 9 para registrar, consultar, modificar y eliminar reservas
de habitaciones de un hotel. Sigue la misma arquitectura y convenciones del
proyecto `Examen_Parcial` (Web API + Core + Modelo, Dapper contra PostgreSQL,
MongoDB para bitácora).

## Estructura

```
Examen_Hotel.slnx
Examen_Hotel/               -> Web API (ASP.NET 9)
  Program.cs                   DI de Npgsql/Mongo, Swagger UI
  appsettings.json             cadenas de conexión (local, no versionado; ver appsettings.example.json)
  Controllers/ReservaController.cs
Core/                        -> Dapper, Npgsql, MongoDB.Driver
  Interfaz/IReserva.cs
  Servicios/ReservaServicio.cs
Modelo/                      -> MongoDB.Bson
  Modelos/MHabitacion.cs        entidad de PostgreSQL (habitaciones)
  Modelos/MReserva.cs           entidad de PostgreSQL (reservas)
  Modelos/MReservaMongo.cs      bitácora de MongoDB
  Modelos/ReservaResultado.cs   resultado de operaciones con código/mensaje
database/hotel_postgres.sql  -> script de creación de la BD/tablas + datos de prueba
```

## Modelo de datos

**PostgreSQL**

- Tabla `habitacion`: número de habitación, tipo, precio por noche y estado
  (`DISPONIBLE` / `OCUPADA`).
- Tabla `reserva`: nombre del cliente, habitación seleccionada (FK a
  `habitacion`), fecha de entrada, fecha de salida, cantidad de personas,
  monto total, estado, fecha de registro y usuario que realizó la operación.

**MongoDB** - colección `Reserva_Historial` (base `ExamenHotel`): un
documento por cada alta (POST), modificación (PUT) o eliminación (DELETE),
con el ID de la reserva en PostgreSQL, número de habitación, estado, tipo de
operación, descripción, usuario y fecha.

## Reglas de negocio

- **POST**: valida que la habitación exista y esté `DISPONIBLE`, calcula el
  monto total (`noches x precio_noche`), registra la reserva con estado
  `CONFIRMADA` y cambia la habitación a `OCUPADA`. Postgres y Mongo se
  actualizan dentro de una transacción sobre la reserva + habitación.
- **PUT**: permite modificar los datos de la reserva (cliente, fechas,
  cantidad de personas, estado, usuario), recalculando el monto total según
  el precio vigente de la habitación ya asignada.
- **DELETE**: elimina la reserva y regresa la habitación asociada a
  `DISPONIBLE`.
- Cada POST, PUT y DELETE genera un documento en `Reserva_Historial`.

## Endpoints (`Api/Reserva`)

| Método | Ruta                     | Descripción                                    |
|--------|--------------------------|-------------------------------------------------|
| GET    | `/Api/Reserva/ObtenerTodos` | Lista todas las reservas                     |
| GET    | `/Api/Reserva/{id}`         | Obtiene una reserva por ID                   |
| POST   | `/Api/Reserva/Ingresar`     | Registra una reserva (Postgres + Mongo)      |
| PUT    | `/Api/Reserva/{id}`         | Modifica una reserva (Postgres + Mongo)      |
| DELETE | `/Api/Reserva/{id}`         | Elimina una reserva y libera la habitación   |

Ejemplos de request/response en `Examen_Hotel/Examen_Hotel.http`.

## Requisitos previos

- .NET SDK 9
- PostgreSQL corriendo localmente (por defecto `localhost:5432`)
- MongoDB corriendo localmente (por defecto `localhost:27017`)

## Puesta en marcha local

### 1. Crear la base de datos en PostgreSQL

Ejecuta el script `database/hotel_postgres.sql`, que crea la base
`EXAMEN_HOTEL`, las tablas `habitacion`/`reserva` y algunas habitaciones de
prueba (101, 102, 201).

```bash
psql -U postgres -h localhost -f database/hotel_postgres.sql
```

O bien, desde `psql` ya conectado:

```sql
\i database/hotel_postgres.sql
```

### 2. MongoDB

No requiere script: la base `ExamenHotel` y la colección `Reserva_Historial`
se crean solas al insertar el primer documento (primer POST/PUT/DELETE).
Solo asegúrate de que el servicio esté corriendo:

```bash
mongod --dbpath <tu-ruta-de-datos>
```

### 3. Ajustar la cadena de conexión

`appsettings.json` no se versiona (contiene credenciales). Cópialo desde la
plantilla y pon la contraseña de tu Postgres local:

```bash
cp Examen_Hotel/appsettings.example.json Examen_Hotel/appsettings.json
```

```json
"DefaultConnection": "Host=localhost;Port=5432;Database=EXAMEN_HOTEL;Username=postgres;Password=<tu-contraseña>",
"MongoDB": "mongodb://localhost:27017"
```

### 4. Restaurar, compilar y ejecutar

Desde la raíz del proyecto (`Examen_Hotel/`):

```bash
dotnet restore Examen_Hotel.slnx
dotnet build Examen_Hotel.slnx
dotnet run --project Examen_Hotel/Examen_Hotel.csproj
```

La API queda disponible en `http://localhost:5270` (perfil `http`) o
`https://localhost:7252` (perfil `https`). Para forzar un perfil:

```bash
dotnet run --project Examen_Hotel/Examen_Hotel.csproj --launch-profile https
```

### 5. Swagger

Con la API corriendo en modo `Development`:

```
http://localhost:5270/swagger
```

### 6. Probar los endpoints

Con la API corriendo, usa `Examen_Hotel/Examen_Hotel.http` (VS Code REST
Client / Visual Studio) o `curl`:

```bash
# Listar reservas
curl http://localhost:5270/Api/Reserva/ObtenerTodos

# Registrar una reserva (habitación 1 = "101", debe estar DISPONIBLE)
curl -X POST http://localhost:5270/Api/Reserva/Ingresar \
  -H "Content-Type: application/json" \
  -d '{
        "nombreCliente": "Juan Pérez",
        "idHabitacion": 1,
        "fechaEntrada": "2026-10-01",
        "fechaSalida": "2026-10-04",
        "cantidadPersonas": 2,
        "usuario": "dquan"
      }'

# Modificar la reserva 1
curl -X PUT http://localhost:5270/Api/Reserva/1 \
  -H "Content-Type: application/json" \
  -d '{
        "nombreCliente": "Juan Pérez",
        "fechaEntrada": "2026-10-01",
        "fechaSalida": "2026-10-05",
        "cantidadPersonas": 3,
        "estado": "CONFIRMADA",
        "usuario": "dquan"
      }'

# Eliminar la reserva 1 (libera la habitación)
curl -X DELETE http://localhost:5270/Api/Reserva/1
```

## Estado de verificación

- `dotnet build Examen_Hotel.slnx` -> compila sin errores ni warnings.
- Probado end-to-end el 2026-09-20 contra una instancia real de PostgreSQL 18
  y MongoDB locales: flujo completo GET -> POST -> GET -> PUT -> DELETE sobre
  `Api/Reserva`, incluyendo los tres casos de validación del POST (habitación
  inexistente -> 404, habitación no disponible -> 409, fechas inválidas ->
  400). Se confirmó que cada operación generó su documento correspondiente
  (`Registro` / `Modificacion` / `Eliminacion`) en `Reserva_Historial`
  (MongoDB) y que la habitación pasa correctamente de `DISPONIBLE` a
  `OCUPADA` en el POST y de vuelta a `DISPONIBLE` en el DELETE.
- Durante esa prueba se corrigieron dos bugs:
  - `database/hotel_postgres.sql` tenía `\c EXAMEN_HOTEL` solo como
    comentario (no como comando ejecutable), por lo que al correr el script
    con `psql -f` las tablas se creaban en la base `postgres` por defecto en
    vez de `EXAMEN_HOTEL`. Corregido para usar el meta-comando real `\c`.
  - `MReserva.FechaEntrada`/`FechaSalida` estaban tipadas como `DateTime`,
    pero Npgsql mapea la columna `date` de Postgres a `DateOnly`, lo que
    rompía silenciosamente el GET (el `catch` devolvía listas vacías) y el
    POST fallaba con `DateOnly cannot be used as a parameter value` (Dapper
    no tiene soporte nativo de `DateOnly` como parámetro). Se cambiaron los
    campos a `DateOnly` y se agregó `Core/Servicios/DateOnlyTypeHandler.cs`,
    registrado en el constructor estático de `ReservaServicio`.
