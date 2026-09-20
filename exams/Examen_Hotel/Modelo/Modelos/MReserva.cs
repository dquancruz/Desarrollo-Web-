using System;

namespace Modelo.Modelos
{
    public class MReserva
    {
        public int IdReserva { get; set; }
        public string NombreCliente { get; set; } = string.Empty;
        public int IdHabitacion { get; set; }

        // Se llena al consultar (join con habitacion); no se usa para insertar/actualizar.
        public string? NumeroHabitacion { get; set; }

        // La columna Postgres es "date"; Npgsql la mapea a DateOnly (no DateTime).
        public DateOnly FechaEntrada { get; set; }
        public DateOnly FechaSalida { get; set; }
        public int CantidadPersonas { get; set; }
        public decimal MontoTotal { get; set; }
        public string Estado { get; set; } = "CONFIRMADA";
        public DateTime FechaRegistro { get; set; }
        public string Usuario { get; set; } = string.Empty;
    }
}
