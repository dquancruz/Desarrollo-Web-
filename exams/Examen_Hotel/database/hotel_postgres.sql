-- =========================================================
-- Examen Hotel - Script de creación de base de datos local
-- Motor: PostgreSQL
-- =========================================================

-- 1. Crear la base de datos (ejecutar conectado a la BD "postgres" u otra existente).
CREATE DATABASE "EXAMEN_HOTEL";

-- 2. Conectarse a la base recién creada antes de continuar.
--    Este meta-comando solo funciona en psql (interactivo o con -f); si tu
--    cliente no lo soporta, ejecuta el resto del script manualmente
--    después de conectarte a "EXAMEN_HOTEL".
\c "EXAMEN_HOTEL"

-- 3. Tabla de habitaciones.
CREATE TABLE habitacion (
    id_habitacion     SERIAL PRIMARY KEY,
    numero_habitacion VARCHAR(10)     NOT NULL UNIQUE,
    tipo              VARCHAR(50)     NOT NULL,
    precio_noche      NUMERIC(10, 2)  NOT NULL CHECK (precio_noche >= 0),
    estado            VARCHAR(20)     NOT NULL DEFAULT 'DISPONIBLE'
);

CREATE INDEX idx_habitacion_estado ON habitacion (estado);

-- 4. Tabla de reservas.
CREATE TABLE reserva (
    id_reserva        SERIAL PRIMARY KEY,
    nombre_cliente    VARCHAR(150)    NOT NULL,
    id_habitacion     INT             NOT NULL REFERENCES habitacion (id_habitacion),
    fecha_entrada     DATE            NOT NULL,
    fecha_salida      DATE            NOT NULL,
    cantidad_personas INT             NOT NULL CHECK (cantidad_personas > 0),
    monto_total       NUMERIC(12, 2)  NOT NULL CHECK (monto_total >= 0),
    estado            VARCHAR(20)     NOT NULL DEFAULT 'CONFIRMADA',
    fecha_registro    TIMESTAMP       NOT NULL DEFAULT NOW(),
    usuario           VARCHAR(100)    NOT NULL,
    CHECK (fecha_salida > fecha_entrada)
);

CREATE INDEX idx_reserva_estado ON reserva (estado);

-- 5. Datos de prueba para habitaciones (necesarios para poder crear reservas).
INSERT INTO habitacion (numero_habitacion, tipo, precio_noche, estado) VALUES
    ('101', 'Sencilla', 350.00, 'DISPONIBLE'),
    ('102', 'Doble',    500.00, 'DISPONIBLE'),
    ('201', 'Suite',    950.00, 'DISPONIBLE');

-- =========================================================
-- Notas:
-- - La cadena de conexión usada por la API está en
--   Examen_Hotel/appsettings.json (ConnectionStrings:DefaultConnection).
--   Ajusta usuario/contraseña/puerto según tu instalación local.
-- - El historial de altas, modificaciones y eliminaciones de cada
--   reserva se guarda en MongoDB (base "ExamenHotel", colección
--   "Reserva_Historial"); no requiere script porque Mongo crea la
--   base/colección al insertar el primer documento.
-- =========================================================
