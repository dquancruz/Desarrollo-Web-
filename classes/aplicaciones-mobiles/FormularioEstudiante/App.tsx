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
  Switch,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const COLOR_PRIMARIO = '#0F766E';

const carreras = [
  'Ingeniería en Sistemas',
  'Administración de Empresas',
  'Derecho',
  'Psicología',
  'Medicina',
];

const jornadas = ['Matutina', 'Vespertina', 'Nocturna'];

const intereses = ['Programación', 'Deportes', 'Música', 'Arte'];

const FormularioEstudiante = () => {
  const [nombre, setNombre] = useState('');
  const [carnet, setCarnet] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState<Date | null>(null);
  const [mostrarFecha, setMostrarFecha] = useState(false);
  const [carrera, setCarrera] = useState('');
  const [jornada, setJornada] = useState('');
  const [interesesSel, setInteresesSel] = useState<string[]>([]);
  const [beca, setBeca] = useState(false);
  const [aceptaTerminos, setAceptaTerminos] = useState(false);

  const formatearFecha = (fecha: Date) =>
    `${String(fecha.getDate()).padStart(2, '0')}/${String(
      fecha.getMonth() + 1,
    ).padStart(2, '0')}/${fecha.getFullYear()}`;

  const alternarInteres = (interes: string) =>
    setInteresesSel(actual =>
      actual.includes(interes)
        ? actual.filter(i => i !== interes)
        : [...actual, interes],
    );

  const limpiar = () => {
    setNombre('');
    setCarnet('');
    setCorreo('');
    setTelefono('');
    setFechaNacimiento(null);
    setCarrera('');
    setJornada('');
    setInteresesSel([]);
    setBeca(false);
    setAceptaTerminos(false);
  };

  const handleSubmit = () => {
    if (
      !nombre.trim() ||
      !carnet.trim() ||
      !correo.trim() ||
      !telefono.trim() ||
      !fechaNacimiento ||
      !carrera ||
      !jornada
    ) {
      Alert.alert('Error', 'Por favor, complete todos los campos');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(correo)) {
      Alert.alert('Error', 'El correo no tiene un formato válido');
      return;
    }
    if (telefono.length !== 8) {
      Alert.alert('Error', 'El teléfono debe tener 8 dígitos');
      return;
    }
    if (!aceptaTerminos) {
      Alert.alert('Error', 'Debe aceptar los términos y condiciones');
      return;
    }

    Alert.alert(
      'Inscripción registrada',
      `Nombre: ${nombre}\nCarnet: ${carnet}\nCorreo: ${correo}\nTeléfono: ${telefono}\nFecha de nacimiento: ${formatearFecha(
        fechaNacimiento,
      )}\nCarrera: ${carrera}\nJornada: ${jornada}\nIntereses: ${
        interesesSel.length ? interesesSel.join(', ') : 'Ninguno'
      }\nBeca: ${beca ? 'Sí' : 'No'}`,
      [{ text: 'Aceptar', onPress: limpiar }],
    );
  };

  const campo = (
    etiqueta: string,
    props: React.ComponentProps<typeof TextInput>,
  ) => (
    <View style={style.campo}>
      <Text style={style.label}>{etiqueta}</Text>
      <TextInput
        style={style.input}
        placeholderTextColor="#94A3A1"
        {...props}
      />
    </View>
  );

  return (
    <View style={style.pantalla}>
      <StatusBar barStyle="light-content" />
      <View style={style.encabezado}>
        <Text style={style.titulo}>Inscripción de Estudiante</Text>
        <Text style={style.subtitulo}>Completa tus datos académicos</Text>
      </View>

      <ScrollView
        contentContainerStyle={style.container}
        keyboardShouldPersistTaps="handled">
        <View style={style.tarjeta}>
          {campo('Nombre completo', {
            placeholder: 'Escribe tu nombre',
            value: nombre,
            onChangeText: setNombre,
          })}
          {campo('Carnet', {
            placeholder: 'Ej. 2024001',
            keyboardType: 'number-pad',
            value: carnet,
            onChangeText: setCarnet,
          })}
          {campo('Correo', {
            placeholder: 'correo@ejemplo.com',
            keyboardType: 'email-address',
            autoCapitalize: 'none',
            value: correo,
            onChangeText: setCorreo,
          })}
          {campo('Teléfono', {
            placeholder: '8 dígitos',
            keyboardType: 'phone-pad',
            maxLength: 8,
            value: telefono,
            onChangeText: setTelefono,
          })}

          <View style={style.campo}>
            <Text style={style.label}>Fecha de nacimiento</Text>
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
                value={fechaNacimiento ?? new Date(2005, 0, 1)}
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
            <Text style={style.label}>Carrera</Text>
            <View style={[style.input, style.pickerCaja]}>
              <Picker
                selectedValue={carrera}
                onValueChange={setCarrera}
                dropdownIconColor={COLOR_PRIMARIO}>
                <Picker.Item
                  label="Selecciona una carrera"
                  value=""
                  color="#94A3A1"
                />
                {carreras.map(c => (
                  <Picker.Item key={c} label={c} value={c} color="#14302D" />
                ))}
              </Picker>
            </View>
          </View>

          <View style={style.campo}>
            <Text style={style.label}>Jornada</Text>
            {jornadas.map(j => (
              <TouchableOpacity
                key={j}
                style={style.opcion}
                onPress={() => setJornada(j)}>
                <View style={style.radio}>
                  {jornada === j && <View style={style.radioActivo} />}
                </View>
                <Text style={style.opcionTexto}>{j}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={style.campo}>
            <Text style={style.label}>Intereses</Text>
            {intereses.map(i => (
              <TouchableOpacity
                key={i}
                style={style.opcion}
                onPress={() => alternarInteres(i)}>
                <View style={style.checkbox}>
                  {interesesSel.includes(i) && (
                    <Text style={style.check}>✓</Text>
                  )}
                </View>
                <Text style={style.opcionTexto}>{i}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={[style.campo, style.filaSwitch]}>
            <Text style={style.label}>¿Solicita beca?</Text>
            <Switch
              value={beca}
              onValueChange={setBeca}
              trackColor={{ false: '#CBD5D3', true: '#5EEAD4' }}
              thumbColor={beca ? COLOR_PRIMARIO : '#F4F4F4'}
            />
          </View>

          <View style={[style.campo, style.filaSwitch]}>
            <Text style={[style.label, style.terminos]}>
              Acepto los términos y condiciones
            </Text>
            <Switch
              value={aceptaTerminos}
              onValueChange={setAceptaTerminos}
              trackColor={{ false: '#CBD5D3', true: '#5EEAD4' }}
              thumbColor={aceptaTerminos ? COLOR_PRIMARIO : '#F4F4F4'}
            />
          </View>

          <TouchableOpacity
            style={style.boton}
            activeOpacity={0.85}
            onPress={handleSubmit}>
            <Text style={style.botonTexto}>Inscribirme</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.botonSecundario}
            activeOpacity={0.85}
            onPress={limpiar}>
            <Text style={style.botonSecundarioTexto}>Limpiar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: '#ECF5F4',
  },
  encabezado: {
    backgroundColor: COLOR_PRIMARIO,
    paddingTop: 48,
    paddingBottom: 24,
    alignItems: 'center',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  titulo: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
  },
  subtitulo: {
    color: '#CCFBF1',
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
    shadowColor: '#14302D',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  campo: {
    marginBottom: 14,
  },
  label: {
    fontWeight: '700',
    color: '#14302D',
    marginBottom: 6,
    fontSize: 14,
  },
  input: {
    minHeight: 46,
    borderColor: '#CBD5D3',
    borderWidth: 1.5,
    backgroundColor: '#F6FAF9',
    paddingHorizontal: 12,
    borderRadius: 12,
    color: '#14302D',
  },
  selector: {
    justifyContent: 'center',
  },
  pickerCaja: {
    paddingHorizontal: 0,
    justifyContent: 'center',
  },
  fechaTexto: {
    color: '#14302D',
  },
  fechaPlaceholder: {
    color: '#94A3A1',
  },
  opcion: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  opcionTexto: {
    color: '#14302D',
    fontSize: 15,
    marginLeft: 10,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: COLOR_PRIMARIO,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioActivo: {
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: COLOR_PRIMARIO,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: COLOR_PRIMARIO,
    alignItems: 'center',
    justifyContent: 'center',
  },
  check: {
    color: COLOR_PRIMARIO,
    fontWeight: '900',
    fontSize: 15,
    lineHeight: 18,
  },
  filaSwitch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  terminos: {
    flex: 1,
    marginBottom: 0,
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
  botonSecundario: {
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1.5,
    borderColor: COLOR_PRIMARIO,
  },
  botonSecundarioTexto: {
    color: COLOR_PRIMARIO,
    fontSize: 15,
    fontWeight: '700',
  },
});

export default FormularioEstudiante;
