import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function DetallePeliculaScreen({ route, navigation }) {
  const { pelicula } = route.params;

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.volver}>← Volver</Text>
      </TouchableOpacity>

      <Image
        source={{ uri: pelicula.movie_banner || pelicula.image }}
        style={styles.banner}
        resizeMode="cover"
      />

      <Text style={styles.title}>{pelicula.title}</Text>
      <Text style={styles.original}>
        {pelicula.original_title} ({pelicula.original_title_romanised})
      </Text>

      <View style={styles.box}>
        <Text style={styles.dato}>Estreno: {pelicula.release_date}</Text>
        <Text style={styles.dato}>Duracion: {pelicula.running_time} min</Text>
        <Text style={styles.dato}>Director: {pelicula.director}</Text>
        <Text style={styles.dato}>Productor: {pelicula.producer}</Text>
        <Text style={styles.dato}>Puntaje Rotten Tomatoes: {pelicula.rt_score}</Text>
      </View>

      <Text style={styles.seccion}>Sinopsis</Text>
      <Text style={styles.descripcion}>{pelicula.description}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#101820" },
  volver: { color: "#40E0D0", fontSize: 16, marginBottom: 10 },
  banner: { width: "100%", height: 200, borderRadius: 20, backgroundColor: "#0b1218" },
  title: { fontSize: 30, fontWeight: "bold", color: "white", marginTop: 20 },
  original: { color: "#AAA", marginTop: 4, marginBottom: 20 },
  box: { backgroundColor: "#182533", padding: 20, borderRadius: 15 },
  dato: { color: "white", marginBottom: 8 },
  seccion: { fontSize: 22, fontWeight: "bold", color: "#40E0D0", marginTop: 25, marginBottom: 10 },
  descripcion: { color: "#DDD", lineHeight: 22, marginBottom: 40 },
});
