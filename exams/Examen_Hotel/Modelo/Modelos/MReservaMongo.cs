using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace Modelo.Modelos
{
    // Bitácora de Reserva guardada en MongoDB.
    // Se agrega un registro cada vez que una reserva se crea (POST), se
    // modifica (PUT) o se elimina (DELETE), para llevar un historial de
    // las operaciones realizadas.
    public class MReservaMongo
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        public int IdReserva { get; set; }
        public string NumeroHabitacion { get; set; } = string.Empty;
        public string Estado { get; set; } = string.Empty;
        public DateTime Fecha { get; set; }
        public string Descripcion { get; set; } = string.Empty;
        public string Usuario { get; set; } = string.Empty;

        // "Registro", "Modificacion" o "Eliminacion".
        public string TipoOperacion { get; set; } = "Registro";
    }
}
