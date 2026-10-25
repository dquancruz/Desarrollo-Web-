import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Image,
} from 'react-native';

export default function App(){
  const[pokemon, setPokemon] = useState('');
  const[data, setData] = useState<any>(null);
  const[loading, setLoading] = useState(false);
  const[error, setError] = useState('');

  const BuscarPokemon = async() => {
    if(!pokemon){
      setError('Ingrese un nombre');
      return;
    }
    setLoading(true);
    setError('');
    setData(null);

    try{
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`);

      if(!response.ok){
        setError('Pokemon no encontrado');
        setLoading(false);
        return;
      }
      
      const json = await response.json();
      setData(json)

    } catch(error) {
      console.error(error)
      setError('Error de conexion con el servicio');
    }

    setLoading(false);
  };

  const imagen = data?.sprites?.other?.['official-artwork']?.front_default || data?.sprites?.front_default || null;

  const imagenShiny = data?.sprites?.front_shiny || null;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.tittle}> - Aplicacion de Pokemon - </Text>
      <TextInput style={styles.input} placeholder='Ej. bulbasur' placeholderTextColor="#666" onChangeText={setPokemon}/>
      <TouchableOpacity style={styles.button} onPress={BuscarPokemon}>
        <Text style={styles.buttonText}>% Buscar Pokemon %</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color={'blue'}/>}

      {error? <Text style={styles.error}>{error}</Text>:null}

      {data && (
        <View style={styles.card}>
          <Text style={styles.pokename} > {data.name.toUpperCase()} </Text>
          {/* Imagen Principal */}
          {imagen && (
            <Image source={{uri: imagen}} style={styles.image} resizeMode='contain'/>
          )}

          {/* Imagen Secundaria */}
          {imagenShiny && (
            <>
            <Text style={styles.shinyLabel}> Version Alternativa </Text>
            <Image source={{uri: imagenShiny}} style={styles.imageShiny} resizeMode='contain'/>
            </>
          )}

          {/*  Pintamos informacion del JSON*/}

          <Text style={styles.subtitle}>Información del Pokémon</Text>

          <View style={styles.detalle}>
            <Text style={styles.etiqueta}>Número</Text>
            <Text style={styles.valor}>#{data.id}</Text>
          </View>

          <View style={styles.detalle}>
            <Text style={styles.etiqueta}>Altura</Text>
            <Text style={styles.valor}>{data.height / 10} metros</Text>
          </View>

          <View style={styles.detalle}>
            <Text style={styles.etiqueta}>Peso</Text>
            <Text style={styles.valor}>{data.weight / 10} kg</Text>
          </View>

          <View style={styles.detalle}>
            <Text style={styles.etiqueta}>Experiencia</Text>
            <Text style={styles.valor}>{data.base_experience ?? 'N/D'} XP</Text>
          </View>

          <View style={styles.detalle}>
            <Text style={styles.etiqueta}>Tipo</Text>
            <Text style={styles.valor}>
              {data.types.map((t: any) => t.type.name).join(', ')}
            </Text>
          </View>

          <Text style={styles.subtitle}>Habilidades</Text>

          {data.abilities.map((a: any, index: number) => (
            <View key={index} style={styles.detalle}>
              <Text style={styles.etiqueta}>Habilidad {index + 1}</Text>
              <Text style={styles.valor}>{a.ability.name}</Text>
            </View>
          ))}

          <Text style={styles.subtitle}>Estadísticas</Text>

          {data.stats.map((s: any, index: number) => (
            <View key={index} style={styles.detalle}>
              <Text style={styles.etiqueta}>{s.stat.name}</Text>
              <Text style={styles.valor}>{s.base_stat}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  tittle: {
    color: '#222',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
  },
  input: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    color: '#000',
  },
  button: {
    backgroundColor: '#ff4444',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 16,
  },
  card: {
    backgroundColor: '#f8f8f8',
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
    elevation: 5,
  },
  pokename: {
    color: '#000',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  shinyLabel: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
    color: '#d4af37',
    fontWeight: 'bold',
  },
  imageShiny: {
    width: '100%',
    height: 160,
    marginVertical: 10,
  },
  subtitle: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  info: {
    color: '#444',
    fontSize: 16,
    marginVertical: 2,
  },
  detalle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },

  etiqueta: {
    fontSize: 16,
    color: '#666',
  },

  valor: {
    fontSize: 16,
    fontWeight: '500',
    color: '#222',
  },
});
