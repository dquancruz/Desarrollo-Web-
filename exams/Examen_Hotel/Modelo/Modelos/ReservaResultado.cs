namespace Modelo.Modelos
{
    // Códigos que el controlador usa para decidir el status HTTP a devolver.
    public static class ReservaCodigo
    {
        public const string Ok = "OK";
        public const string HabitacionNoEncontrada = "HABITACION_NO_ENCONTRADA";
        public const string HabitacionNoDisponible = "HABITACION_NO_DISPONIBLE";
        public const string FechasInvalidas = "FECHAS_INVALIDAS";
        public const string ReservaNoEncontrada = "RESERVA_NO_ENCONTRADA";
        public const string Error = "ERROR";
    }

    public class ReservaResultado
    {
        public bool Exito { get; set; }
        public string Codigo { get; set; } = ReservaCodigo.Error;
        public string Mensaje { get; set; } = string.Empty;
        public int IdReserva { get; set; }
    }
}
