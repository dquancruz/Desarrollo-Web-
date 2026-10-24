import React, { useState } from 'react';
import { Text, TextInput, Button, Alert, StyleSheet, ScrollView } from 'react-native';

const FormularioUsuario = () => { 
  const[nombre, setNombre] = useState('');
  const[apellido, setApellido] = useState('');
  const[telefono, setTelefono] = useState('');
  const[dpi, setDpi] = useState('');

 const handleSumbit =() =>{
  // Ahora verificamos cuando ahcemos Submit}
  if (!nombre || !apellido || ! telefono || !dpi){
    Alert.alert('Error', 'Por favor, ingrese los campos completos');
  }
  else{
  Alert.alert('Datos del Formulario', `Nombre: ${nombre} \n Apellido: ${apellido} \n 
    Telefono: ${telefono}  \n DPI: ${dpi}` );
  }

 };

 return(
     <ScrollView contentContainerStyle={style.container}>
      <Text style={style.label}> Nombre:</Text>
           <TextInput style={style.input} placeholder='Escribe tu nombre'
              value={nombre} onChangeText={setNombre}/>

      <Text style={style.label}> Apellido:</Text>
           <TextInput style={style.input} placeholder='Escribe tu apellido'
              value={apellido} onChangeText={setApellido}/>

        <Text style={style.label}> Teléfono:</Text>
           <TextInput style={style.input} placeholder='Escribe tu télefono'
               keyboardType='phone-pad'
              value={telefono} onChangeText={setTelefono}/>

             <Text style={style.label}> DPI:</Text>
      <TextInput style={style.input} placeholder='Escribe tu DPI'
               keyboardType='phone-pad'
              value={dpi} onChangeText={setDpi}/>
      <Button title='Enviar' onPress={handleSumbit}/>
     </ScrollView>
 );

};

const style = StyleSheet.create({
  container: {
        padding: 20,
        paddingTop: 50,
  },
  label: {
      fontWeight: 'bold',
      marginBottom: 5,    
  },
  input: {
    height: 40,
    borderColor: '#aaa',
    borderWidth: 1, 
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
}); 

export default FormularioUsuario;