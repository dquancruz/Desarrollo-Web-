using Dapper;
using System.Data;

namespace Core.Servicios
{
    // Dapper no sabe convertir parámetros DateOnly de forma nativa (solo lee
    // columnas "date" como DateOnly gracias a Npgsql, pero no las escribe).
    // Este handler permite usar DateOnly tanto para parámetros de entrada
    // como para las columnas "date" al consultar.
    public class DateOnlyTypeHandler : SqlMapper.TypeHandler<DateOnly>
    {
        public override void SetValue(IDbDataParameter parameter, DateOnly value)
        {
            parameter.DbType = DbType.Date;
            parameter.Value = value.ToDateTime(TimeOnly.MinValue);
        }

        public override DateOnly Parse(object value)
        {
            return value switch
            {
                DateOnly dateOnly => dateOnly,
                DateTime dateTime => DateOnly.FromDateTime(dateTime),
                _ => DateOnly.Parse(value.ToString()!)
            };
        }
    }
}
