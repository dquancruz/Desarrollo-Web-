using Modelo.Modelos;

namespace Core.Interfaz
{
    public interface IReserva
    {
        Task<List<MReserva>> ObtenerTodos();

        Task<MReserva?> ObtenerPorId(int id);

        Task<ReservaResultado> Insertar(MReserva reserva);

        Task<ReservaResultado> Actualizar(MReserva reserva);

        Task<bool> Eliminar(int id);
    }
}
