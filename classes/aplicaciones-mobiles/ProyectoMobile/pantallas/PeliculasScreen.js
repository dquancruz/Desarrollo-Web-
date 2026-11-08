import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import axios from "axios";

export default function PeliculasScreen({ navigation }) {
  const [peliculas, setPeliculas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://ghibliapi.vercel.app/films")
      .then((res) => setPeliculas(res.data))
      .catch(() => setError("No se pudo cargar la lista de peliculas"))
      .finally(() => setCargando(false));
  }, []);

  if (cargando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#40E0D0" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centro}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.volver}>← Volver</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Peliculas</Text>

      <FlatList
        data={peliculas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("DetallePelicula", { pelicula: item })}
          >
            <Image source={{ uri: item.image }} style={styles.poster} />
            <View style={styles.info}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardSub}>
                {item.release_date} · {item.running_time} min
              </Text>
              <Text style={styles.cardSub}>Director: {item.director}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#101820" },
  centro: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#101820" },
  error: { color: "#ff6b6b", fontSize: 16 },
  volver: { color: "#40E0D0", fontSize: 16, marginBottom: 10 },
  title: { fontSize: 32, fontWeight: "bold", color: "white", marginBottom: 20 },
  card: {
    flexDirection: "row",
    backgroundColor: "#182533",
    borderRadius: 20,
    marginBottom: 15,
    overflow: "hidden",
  },
  poster: { width: 90, height: 130, backgroundColor: "#0b1218" },
  info: { flex: 1, padding: 15, justifyContent: "center" },
  cardTitle: { fontSize: 18, fontWeight: "bold", color: "#40E0D0" },
  cardSub: { color: "#AAA", marginTop: 4 },
});
