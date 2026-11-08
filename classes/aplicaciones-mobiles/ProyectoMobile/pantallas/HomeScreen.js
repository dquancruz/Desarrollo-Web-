import {Text, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';

export default function HomeScreen({navigation}) {
  return (
    <ScrollView style={styles.container}>
        <Text style={styles.title}>Consumiento APIs</Text>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Clima')}>
            <Text style={styles.cardTitle}>Clima</Text>
            <Text style={styles.cardSub}>Consulta el clima actual y pronostico</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Peliculas')}>
            <Text style={styles.cardTitle}>Peliculas</Text>
            <Text style={styles.cardSub}>Consulta Lista y detalles</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Libros')}>
            <Text style={styles.cardTitle}>Libros</Text>
            <Text style={styles.cardSub}>Consulta libros por autor o titulo</Text>
        </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#101820" },
  title: { fontSize: 32, fontWeight: "bold", color: "white", marginBottom: 20 },
  card: {
    backgroundColor: "#182533",
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
  },
  cardTitle: { fontSize: 22, fontWeight: "bold", color: "#40E0D0" },
  cardSub: { color: "#AAA", marginTop: 5 },
});
