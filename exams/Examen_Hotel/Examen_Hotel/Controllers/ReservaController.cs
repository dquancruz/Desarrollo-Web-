using Core.Interfaz;
using Microsoft.AspNetCore.Mvc;
using Modelo.Modelos;

namespace Examen_Hotel.Controllers
{
    [Route("Api/[Controller]")]
    [ApiController]
    public class ReservaController : Controller
    {
        private readonly IReserva _reservaServicio;

        public ReservaController(IReserva reservaServicio)
        {
            _reservaServicio = reservaServicio;
        }

        // GET api/reserva/ObtenerTodos
        [HttpGet("ObtenerTodos")]
        public async Task<IActionResult> ObtenerTodos()
        {
            var reservas = await _reservaServicio.ObtenerTodos();
            return Ok(reservas);
        }

        // GET api/reserva/#
        [HttpGet("{id:int}")]
        public async Task<IActionResult> ObtenerPorId(int id)
        {
            var reserva = await _reservaServicio.ObtenerPorId(id);
            if (reserva == null)
            {
                return NotFound(new { mensaje = "Reserva no encontrada." });
            }
            return Ok(reserva);
        }

        // POST api/reserva/Ingresar
        [HttpPost("Ingresar")]
        public async Task<IActionResult> Insertar([FromBody] MReserva reserva)
        {
            if (reserva == null)
            {
                return BadRequest(new { mensaje = "Los datos de la reserva son obligatorios." });
            }
            if (string.IsNullOrWhiteSpace(reserva.NombreCliente))
            {
                return BadRequest(new { mensaje = "El nombre del cliente es obligatorio." });
            }
            if (reserva.IdHabitacion <= 0)
            {
                return BadRequest(new { mensaje = "Debe indicar la habitación a reservar." });
            }
            if (reserva.CantidadPersonas <= 0)
            {
                return BadRequest(new { mensaje = "La cantidad de personas debe ser mayor a cero." });
            }
            if (string.IsNullOrWhiteSpace(reserva.Usuario))
            {
                return BadRequest(new { mensaje = "El usuario que registra la reserva es obligatorio." });
            }

            var resultado = await _reservaServicio.Insertar(reserva);

            if (!resultado.Exito)
            {
                return resultado.Codigo switch
                {
                    ReservaCodigo.HabitacionNoEncontrada => NotFound(new { mensaje = resultado.Mensaje }),
                    ReservaCodigo.HabitacionNoDisponible => Conflict(new { mensaje = resultado.Mensaje }),
                    ReservaCodigo.FechasInvalidas => BadRequest(new { mensaje = resultado.Mensaje }),
                    _ => StatusCode(500, new { mensaje = resultado.Mensaje })
                };
            }

            return Ok(new
            {
                mensaje = resultado.Mensaje,
                idReserva = resultado.IdReserva
            });
        }

        // PUT api/reserva/#
        [HttpPut("{id:int}")]
        public async Task<IActionResult> Actualizar(int id, [FromBody] MReserva reserva)
        {
            if (reserva == null)
            {
                return BadRequest(new { mensaje = "Los datos de la reserva son obligatorios." });
            }
            if (string.IsNullOrWhiteSpace(reserva.NombreCliente))
            {
                return BadRequest(new { mensaje = "El nombre del cliente es obligatorio." });
            }
            if (reserva.CantidadPersonas <= 0)
            {
                return BadRequest(new { mensaje = "La cantidad de personas debe ser mayor a cero." });
            }
            if (string.IsNullOrWhiteSpace(reserva.Usuario))
            {
                return BadRequest(new { mensaje = "El usuario que realiza la operación es obligatorio." });
            }

            reserva.IdReserva = id;

            var resultado = await _reservaServicio.Actualizar(reserva);

            if (!resultado.Exito)
            {
                return resultado.Codigo switch
                {
                    ReservaCodigo.ReservaNoEncontrada => NotFound(new { mensaje = resultado.Mensaje }),
                    ReservaCodigo.FechasInvalidas => BadRequest(new { mensaje = resultado.Mensaje }),
                    _ => StatusCode(500, new { mensaje = resultado.Mensaje })
                };
            }

            return Ok(new { mensaje = resultado.Mensaje });
        }

        // DELETE api/reserva/#
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            var reservaExistente = await _reservaServicio.ObtenerPorId(id);
            if (reservaExistente == null)
            {
                return NotFound(new { mensaje = "Reserva no encontrada." });
            }

            bool resultado = await _reservaServicio.Eliminar(id);
            if (!resultado)
            {
                return StatusCode(500, new
                {
                    mensaje = "No fue posible eliminar la reserva."
                });
            }

            return Ok(new { mensaje = "La reserva fue eliminada y la habitación quedó disponible nuevamente." });
        }
    }
}
