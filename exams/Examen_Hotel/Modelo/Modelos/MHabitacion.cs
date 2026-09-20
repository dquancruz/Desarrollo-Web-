namespace Modelo.Modelos
{
    public class MHabitacion
    {
        public int IdHabitacion { get; set; }
        public string NumeroHabitacion { get; set; } = string.Empty;
        public string Tipo { get; set; } = string.Empty;
        public decimal PrecioPorNoche { get; set; }
        public string Estado { get; set; } = "DISPONIBLE";
    }
}
