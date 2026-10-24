import React, { useState } from 'react';
import {
  Text,
  TextInput,
  Alert,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  StatusBar,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const COLOR_PRIMARIO = '#4F46E5';

const FormularioEmpleado = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [dpi, setDpi] = useState('');
  const [direccion, setDireccion] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState<Date | null>(null);
  const [departamento, setDepartamento] = useState('');
  const [mostrarFecha, setMostrarFecha] = useState(false);

  const departamentos = [
    'Guatemala',
    'Quetzaltenango',
    'Huehuetenango',
    'Escuintla',
    'Alta Verapaz',
    'Petén',
  ];

  const formatearFecha = (fecha: Date) =>
    `${String(fecha.getDate()).padStart(2, '0')}/${String(
      fecha.getMonth() + 1,
    ).padStart(2, '0')}/${fecha.getFullYear()}`;

  const handleSubmit = () => {
    if (
      !nombre ||
      !apellido ||
      !correo ||
      !telefono ||
      !dpi ||
      !direccion ||
      !fechaNacimiento ||
      !departamento
    ) {
      Alert.alert('Error', 'Por favor, ingrese los campos completos');
    } else {
      Alert.alert(
        'Datos del Formulario',
        `Nombre: ${nombre}\nApellido: ${apellido}\nCorreo: ${correo}\nTeléfono: ${telefono}\nDPI: ${dpi}\nDirección: ${direccion}\nFecha de nacimiento: ${formatearFecha(
          fechaNacimiento,
        )}\nDepartamento: ${departamento}`,
      );
    }
  };

  const campo = (
    etiqueta: string,
    icono: string,
    props: React.ComponentProps<typeof TextInput>,
  ) => (
    <View style={style.campo}>
      <Text style={style.label}>
        {icono}  {etiqueta}
      </Text>
      <TextInput
        style={style.input}
        placeholderTextColor="#9AA5B8"
        {...props}
      />
    </View>
  );

  return (
    <View style={style.pantalla}>
      <StatusBar barStyle="light-content" />
      <View style={style.encabezado}>
        <View style={style.circuloGrande} />
        <View style={style.circuloPequeno} />
        <Text style={style.avatar}>👤</Text>
        <Text style={style.titulo}>Registro de Empleado</Text>
        <Text style={style.subtitulo}>Completa tus datos personales</Text>
      </View>

      <ScrollView
        contentContainerStyle={style.container}
        keyboardShouldPersistTaps="handled">
        <View style={style.tarjeta}>
          {campo('Nombre', '🙍', {
            placeholder: 'Escribe tu nombre',
            value: nombre,
            onChangeText: setNombre,
          })}
          {campo('Apellido', '🙍', {
            placeholder: 'Escribe tu apellido',
            value: apellido,
            onChangeText: setApellido,
          })}
          {campo('Correo', '✉️', {
            placeholder: 'correo@ejemplo.com',
            keyboardType: 'email-address',
            autoCapitalize: 'none',
            value: correo,
            onChangeText: setCorreo,
          })}
          {campo('Teléfono', '📞', {
            placeholder: 'Escribe tu teléfono',
            keyboardType: 'phone-pad',
            value: telefono,
            onChangeText: setTelefono,
          })}
          {campo('DPI', '🪪', {
            placeholder: 'Escribe tu DPI',
            keyboardType: 'number-pad',
            value: dpi,
            onChangeText: setDpi,
          })}
          {campo('Dirección', '🏠', {
            placeholder: 'Escribe tu dirección',
            value: direccion,
            onChangeText: setDireccion,
          })}

          <View style={style.campo}>
            <Text style={style.label}>🎂  Fecha de nacimiento</Text>
            <TouchableOpacity
              style={[style.input, style.selector]}
              onPress={() => setMostrarFecha(true)}>
              <Text
                style={
                  fechaNacimiento ? style.fechaTexto : style.fechaPlaceholder
                }>
                {fechaNacimiento
                  ? formatearFecha(fechaNacimiento)
                  : 'Selecciona una fecha'}
              </Text>
            </TouchableOpacity>
            {mostrarFecha && (
              <DateTimePicker
                value={fechaNacimiento ?? new Date(2000, 0, 1)}
                mode="date"
                maximumDate={new Date()}
                onChange={(_event, fecha) => {
                  setMostrarFecha(false);
                  if (fecha) {
                    setFechaNacimiento(fecha);
                  }
                }}
              />
            )}
          </View>

          <View style={style.campo}>
            <Text style={style.label}>📍  Departamento</Text>
            <View style={[style.input, style.pickerCaja]}>
              <Picker
                selectedValue={departamento}
                onValueChange={setDepartamento}
                dropdownIconColor={COLOR_PRIMARIO}>
                <Picker.Item
                  label="Selecciona un departamento"
                  value=""
                  color="#9AA5B8"
                />
                {departamentos.map(d => (
                  <Picker.Item key={d} label={d} value={d} color="#1F2A44" />
                ))}
              </Picker>
            </View>
          </View>

          <TouchableOpacity
            style={style.boton}
            activeOpacity={0.85}
            onPress={handleSubmit}>
            <Text style={style.botonTexto}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: '#EEF1FB',
  },
  encabezado: {
    backgroundColor: COLOR_PRIMARIO,
    paddingTop: 48,
    paddingBottom: 28,
    alignItems: 'center',
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    overflow: 'hidden',
  },
  circuloGrande: {
    position: 'absolute',
    top: -50,
    right: -40,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  circuloPequeno: {
    position: 'absolute',
    bottom: -20,
    left: -20,
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(255,255,255,0.10)',
  },
  avatar: {
    fontSize: 34,
    width: 68,
    height: 68,
    lineHeight: 68,
    textAlign: 'center',
    borderRadius: 34,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    marginBottom: 10,
  },
  titulo: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
  },
  subtitulo: {
    color: '#DDE1FF',
    fontSize: 14,
    marginTop: 4,
  },
  container: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  tarjeta: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    marginTop: 16,
    elevation: 6,
    shadowColor: '#1F2A44',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  campo: {
    marginBottom: 14,
  },
  label: {
    fontWeight: '700',
    color: '#1F2A44',
    marginBottom: 6,
    fontSize: 14,
  },
  input: {
    minHeight: 46,
    borderColor: '#D6DBEA',
    borderWidth: 1.5,
    backgroundColor: '#F7F8FD',
    paddingHorizontal: 12,
    borderRadius: 12,
    color: '#1F2A44',
  },
  selector: {
    justifyContent: 'center',
  },
  pickerCaja: {
    paddingHorizontal: 0,
    justifyContent: 'center',
  },
  fechaTexto: {
    color: '#1F2A44',
  },
  fechaPlaceholder: {
    color: '#9AA5B8',
  },
  boton: {
    backgroundColor: COLOR_PRIMARIO,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 6,
    elevation: 3,
  },
  botonTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});

export default FormularioEmpleado;
