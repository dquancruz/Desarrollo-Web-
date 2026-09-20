using Core.Interfaz;
using Dapper;
using Microsoft.Extensions.Configuration;
using Modelo.Modelos;
using MongoDB.Driver;
using Npgsql;
using System.Text;

namespace Core.Servicios
{
    public class ReservaServicio : IReserva
    {
        private readonly string _connectionString;
        private readonly IMongoCollection<MReservaMongo> _reservaHistorialCollection;

        private const string EstadoHabitacionDisponible = "DISPONIBLE";
        private const string EstadoHabitacionOcupada = "OCUPADA";
        private const string EstadoReservaConfirmada = "CONFIRMADA";

        static ReservaServicio()
        {
            SqlMapper.AddTypeHandler(new DateOnlyTypeHandler());
        }

        public ReservaServicio(IConfiguration configuration)
        {
            // Postgres
            _connectionString = configuration.GetConnectionString("DefaultConnection")
                ?? throw new InvalidOperationException("No se encontró la cadena de conexión DefaultConnection.");

            // Mongo
            string mongoConnection = configuration.GetConnectionString("MongoDB")
                ?? throw new InvalidOperationException("No se encontró la cadena de conexión MongoDB.");

            var mongoClient = new MongoClient(mongoConnection);
            var mongoDatabase = mongoClient.GetDatabase("ExamenHotel");
            _reservaHistorialCollection = mongoDatabase.GetCollection<MReservaMongo>("Reserva_Historial");
        }

        private NpgsqlConnection CrearConexion()
        {
            return new NpgsqlConnection(_connectionString);
        }

        private const string SelectReservaBase = @"
            SELECT
                r.id_reserva AS IdReserva,
                r.nombre_cliente AS NombreCliente,
                r.id_habitacion AS IdHabitacion,
                h.numero_habitacion AS NumeroHabitacion,
                r.fecha_entrada AS FechaEntrada,
                r.fecha_salida AS FechaSalida,
                r.cantidad_personas AS CantidadPersonas,
                r.monto_total AS MontoTotal,
                r.estado AS Estado,
                r.fecha_registro AS FechaRegistro,
                r.usuario AS Usuario
            FROM reserva r
            INNER JOIN habitacion h ON h.id_habitacion = r.id_habitacion";

        public async Task<List<MReserva>> ObtenerTodos()
        {
            try
            {
                string sql = $"{SelectReservaBase} ORDER BY r.id_reserva;";

                await using var connection = CrearConexion();

                var resultado = await connection.QueryAsync<MReserva>(sql);

                return resultado.ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error al obtener reservas: " + ex.Message);

                return new List<MReserva>();
            }
        }

        public async Task<MReserva?> ObtenerPorId(int id)
        {
            try
            {
                string sql = $"{SelectReservaBase} WHERE r.id_reserva = @IdReserva;";

                await using var connection = CrearConexion();

                var resultado =
                    await connection.QueryFirstOrDefaultAsync<MReserva>(sql, new { IdReserva = id });

                return resultado;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error al obtener reserva por ID: " + ex.Message);

                return null;
            }
        }

        public async Task<ReservaResultado> Insertar(MReserva reserva)
        {
            try
            {
                await using var connection = CrearConexion();
                await connection.OpenAsync();
                await using var transaction = await connection.BeginTransactionAsync();

                const string sqlHabitacion = @"
                    SELECT
                        id_habitacion AS IdHabitacion,
                        numero_habitacion AS NumeroHabitacion,
                        tipo AS Tipo,
                        precio_noche AS PrecioPorNoche,
                        estado AS Estado
                    FROM habitacion
                    WHERE id_habitacion = @IdHabitacion
                    FOR UPDATE;";

                var habitacion = await connection.QueryFirstOrDefaultAsync<MHabitacion>(
                    sqlHabitacion, new { reserva.IdHabitacion }, transaction);

                if (habitacion == null)
                {
                    return new ReservaResultado
                    {
                        Exito = false,
                        Codigo = ReservaCodigo.HabitacionNoEncontrada,
                        Mensaje = "La habitación indicada no existe."
                    };
                }

                if (!string.Equals(habitacion.Estado, EstadoHabitacionDisponible, StringComparison.OrdinalIgnoreCase))
                {
                    return new ReservaResultado
                    {
                        Exito = false,
                        Codigo = ReservaCodigo.HabitacionNoDisponible,
                        Mensaje = "La habitación seleccionada no se encuentra disponible."
                    };
                }

                int noches = reserva.FechaSalida.DayNumber - reserva.FechaEntrada.DayNumber;
                if (noches <= 0)
                {
                    return new ReservaResultado
                    {
                        Exito = false,
                        Codigo = ReservaCodigo.FechasInvalidas,
                        Mensaje = "La fecha de salida debe ser posterior a la fecha de entrada."
                    };
                }

                decimal montoTotal = noches * habitacion.PrecioPorNoche;

                const string sqlInsertar = @"
                    INSERT INTO reserva
                    (
                        nombre_cliente,
                        id_habitacion,
                        fecha_entrada,
                        fecha_salida,
                        cantidad_personas,
                        monto_total,
                        estado,
                        usuario
                    )
                    VALUES
                    (
                        @NombreCliente,
                        @IdHabitacion,
                        @FechaEntrada,
                        @FechaSalida,
                        @CantidadPersonas,
                        @MontoTotal,
                        @Estado,
                        @Usuario
                    )
                    RETURNING id_reserva;";

                int idReserva = await connection.ExecuteScalarAsync<int>(sqlInsertar, new
                {
                    reserva.NombreCliente,
                    reserva.IdHabitacion,
                    reserva.FechaEntrada,
                    reserva.FechaSalida,
                    reserva.CantidadPersonas,
                    MontoTotal = montoTotal,
                    Estado = EstadoReservaConfirmada,
                    reserva.Usuario
                }, transaction);

                const string sqlOcuparHabitacion = @"
                    UPDATE habitacion
                    SET estado = @Estado
                    WHERE id_habitacion = @IdHabitacion;";

                await connection.ExecuteAsync(sqlOcuparHabitacion, new
                {
                    Estado = EstadoHabitacionOcupada,
                    reserva.IdHabitacion
                }, transaction);

                await transaction.CommitAsync();

                // Registro del alta en MongoDB.
                var historial = new MReservaMongo
                {
                    IdReserva = idReserva,
                    NumeroHabitacion = habitacion.NumeroHabitacion,
                    Estado = EstadoReservaConfirmada,
                    Fecha = DateTime.Now,
                    Descripcion = $"Reserva registrada para {noches} noche(s). Habitación {habitacion.NumeroHabitacion} pasó a estado {EstadoHabitacionOcupada}.",
                    Usuario = reserva.Usuario,
                    TipoOperacion = "Registro"
                };

                await _reservaHistorialCollection.InsertOneAsync(historial);

                return new ReservaResultado
                {
                    Exito = true,
                    Codigo = ReservaCodigo.Ok,
                    Mensaje = "La reserva se registró correctamente.",
                    IdReserva = idReserva
                };
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error al insertar reserva: " + ex.Message);

                return new ReservaResultado
                {
                    Exito = false,
                    Codigo = ReservaCodigo.Error,
                    Mensaje = "No fue posible registrar la reserva."
                };
            }
        }

        public async Task<ReservaResultado> Actualizar(MReserva reserva)
        {
            try
            {
                var reservaAnterior = await ObtenerPorId(reserva.IdReserva);
                if (reservaAnterior == null)
                {
                    return new ReservaResultado
                    {
                        Exito = false,
                        Codigo = ReservaCodigo.ReservaNoEncontrada,
                        Mensaje = "Reserva no encontrada."
                    };
                }

                int noches = reserva.FechaSalida.DayNumber - reserva.FechaEntrada.DayNumber;
                if (noches <= 0)
                {
                    return new ReservaResultado
                    {
                        Exito = false,
                        Codigo = ReservaCodigo.FechasInvalidas,
                        Mensaje = "La fecha de salida debe ser posterior a la fecha de entrada."
                    };
                }

                await using var connection = CrearConexion();

                // La habitación de la reserva no se reasigna desde el PUT; solo se
                // recalcula el monto según el precio vigente y las nuevas fechas.
                const string sqlPrecio = "SELECT precio_noche FROM habitacion WHERE id_habitacion = @IdHabitacion;";
                decimal precioPorNoche = await connection.ExecuteScalarAsync<decimal>(
                    sqlPrecio, new { reservaAnterior.IdHabitacion });

                decimal montoTotal = noches * precioPorNoche;

                const string sql = @"
                    UPDATE reserva
                    SET
                        nombre_cliente = @NombreCliente,
                        fecha_entrada = @FechaEntrada,
                        fecha_salida = @FechaSalida,
                        cantidad_personas = @CantidadPersonas,
                        monto_total = @MontoTotal,
                        estado = @Estado,
                        usuario = @Usuario
                    WHERE id_reserva = @IdReserva;";

                int filasAfectadas = await connection.ExecuteAsync(sql, new
                {
                    reserva.NombreCliente,
                    reserva.FechaEntrada,
                    reserva.FechaSalida,
                    reserva.CantidadPersonas,
                    MontoTotal = montoTotal,
                    reserva.Estado,
                    reserva.Usuario,
                    reserva.IdReserva
                });

                if (filasAfectadas <= 0)
                {
                    return new ReservaResultado
                    {
                        Exito = false,
                        Codigo = ReservaCodigo.Error,
                        Mensaje = "No fue posible actualizar la reserva."
                    };
                }

                // Registro de la modificación en MongoDB, detallando qué cambió.
                string descripcion = DescribirCambios(reservaAnterior, reserva, montoTotal);

                var historial = new MReservaMongo
                {
                    IdReserva = reserva.IdReserva,
                    NumeroHabitacion = reservaAnterior.NumeroHabitacion ?? string.Empty,
                    Estado = reserva.Estado,
                    Fecha = DateTime.Now,
                    Descripcion = descripcion,
                    Usuario = reserva.Usuario,
                    TipoOperacion = "Modificacion"
                };

                await _reservaHistorialCollection.InsertOneAsync(historial);

                return new ReservaResultado
                {
                    Exito = true,
                    Codigo = ReservaCodigo.Ok,
                    Mensaje = "La reserva fue actualizada correctamente.",
                    IdReserva = reserva.IdReserva
                };
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error al actualizar reserva: " + ex.Message);

                return new ReservaResultado
                {
                    Exito = false,
                    Codigo = ReservaCodigo.Error,
                    Mensaje = "No fue posible actualizar la reserva."
                };
            }
        }

        public async Task<bool> Eliminar(int id)
        {
            try
            {
                var reserva = await ObtenerPorId(id);
                if (reserva == null)
                {
                    return false;
                }

                await using var connection = CrearConexion();
                await connection.OpenAsync();
                await using var transaction = await connection.BeginTransactionAsync();

                const string sqlEliminar = "DELETE FROM reserva WHERE id_reserva = @IdReserva;";

                int filasAfectadas = await connection.ExecuteAsync(
                    sqlEliminar, new { IdReserva = id }, transaction);

                if (filasAfectadas <= 0)
                {
                    await transaction.RollbackAsync();
                    return false;
                }

                const string sqlLiberarHabitacion = @"
                    UPDATE habitacion
                    SET estado = @Estado
                    WHERE id_habitacion = @IdHabitacion;";

                await connection.ExecuteAsync(sqlLiberarHabitacion, new
                {
                    Estado = EstadoHabitacionDisponible,
                    reserva.IdHabitacion
                }, transaction);

                await transaction.CommitAsync();

                // Registro de la baja en MongoDB.
                var historial = new MReservaMongo
                {
                    IdReserva = id,
                    NumeroHabitacion = reserva.NumeroHabitacion ?? string.Empty,
                    Estado = "ELIMINADA",
                    Fecha = DateTime.Now,
                    Descripcion = $"Reserva eliminada. Habitación {reserva.NumeroHabitacion} volvió a estado {EstadoHabitacionDisponible}.",
                    Usuario = reserva.Usuario,
                    TipoOperacion = "Eliminacion"
                };

                await _reservaHistorialCollection.InsertOneAsync(historial);

                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error al eliminar reserva: " + ex.Message);

                return false;
            }
        }

        private static string DescribirCambios(MReserva anterior, MReserva nuevo, decimal montoTotalNuevo)
        {
            var cambios = new StringBuilder();

            void Comparar(string campo, object? valorAnterior, object? valorNuevo)
            {
                string anteriorTexto = valorAnterior?.ToString() ?? string.Empty;
                string nuevoTexto = valorNuevo?.ToString() ?? string.Empty;

                if (!anteriorTexto.Equals(nuevoTexto, StringComparison.Ordinal))
                {
                    cambios.Append($"{campo}: '{anteriorTexto}' -> '{nuevoTexto}'. ");
                }
            }

            Comparar("NombreCliente", anterior.NombreCliente, nuevo.NombreCliente);
            Comparar("FechaEntrada", anterior.FechaEntrada.ToString("yyyy-MM-dd"), nuevo.FechaEntrada.ToString("yyyy-MM-dd"));
            Comparar("FechaSalida", anterior.FechaSalida.ToString("yyyy-MM-dd"), nuevo.FechaSalida.ToString("yyyy-MM-dd"));
            Comparar("CantidadPersonas", anterior.CantidadPersonas, nuevo.CantidadPersonas);
            Comparar("MontoTotal", anterior.MontoTotal, montoTotalNuevo);
            Comparar("Estado", anterior.Estado, nuevo.Estado);
            Comparar("Usuario", anterior.Usuario, nuevo.Usuario);

            return cambios.Length > 0
                ? cambios.ToString().Trim()
                : "Reserva actualizada sin cambios detectados.";
        }
    }
}
