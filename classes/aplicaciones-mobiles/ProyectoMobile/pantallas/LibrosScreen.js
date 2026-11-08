import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import axios from "axios";

export default function LibrosScreen({ navigation }) {
  const [modo, setModo] = useState("title");
  const [texto, setTexto] = useState("");
  const [libros, setLibros] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState("Escribe un titulo o autor y presiona Buscar");

  const buscar = () => {
    const consulta = texto.trim();
    if (!consulta) {
      setMensaje("Escribe algo para buscar");
      return;
    }

    setCargando(true);
    setMensaje("");
    axios
      .get("https://openlibrary.org/search.json", {
        params: {
          [modo]: consulta,
          limit: 20,
          fields: "key,title,author_name,first_publish_year,cover_i",
        },
      })
      .then((res) => {
        setLibros(res.data.docs);
        if (res.data.docs.length === 0) {
          setMensaje("No se encontraron libros");
        }
      })
      .catch(() => {
        setLibros([]);
        setMensaje("No se pudo realizar la busqueda");
      })
      .finally(() => setCargando(false));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.volver}>← Volver</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Libros</Text>

      <View style={styles.modos}>
        <TouchableOpacity
          style={[styles.modo, modo === "title" && styles.modoActivo]}
          onPress={() => setModo("title")}
        >
          <Text style={[styles.modoTexto, modo === "title" && styles.modoTextoActivo]}>
            Titulo
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.modo, modo === "author" && styles.modoActivo]}
          onPress={() => setModo("author")}
        >
          <Text style={[styles.modoTexto, modo === "author" && styles.modoTextoActivo]}>
            Autor
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buscador}>
        <TextInput
          style={styles.input}
          placeholder={modo === "title" ? "Titulo del libro" : "Nombre del autor"}
          placeholderTextColor="#777"
          value={texto}
          onChangeText={setTexto}
          onSubmitEditing={buscar}
          returnKeyType="search"
        />
        <TouchableOpacity style={styles.boton} onPress={buscar}>
          <Text style={styles.botonTexto}>Buscar</Text>
        </TouchableOpacity>
      </View>

      {cargando ? (
        <ActivityIndicator size="large" color="#40E0D0" style={styles.cargando} />
      ) : (
        <FlatList
          data={libros}
          keyExtractor={(item) => item.key}
          ListEmptyComponent={<Text style={styles.mensaje}>{mensaje}</Text>}
          renderItem={({ item }) => (
            <View style={styles.card}>
              {item.cover_i ? (
                <Image
                  source={{ uri: `https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg` }}
                  style={styles.portada}
                />
              ) : (
                <View style={[styles.portada, styles.sinPortada]}>
                  <Text style={styles.sinPortadaTexto}>Sin portada</Text>
                </View>
              )}
              <View style={styles.info}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardSub}>
                  {item.author_name ? item.author_name.join(", ") : "Autor desconocido"}
                </Text>
                <Text style={styles.cardSub}>
                  Publicado: {item.first_publish_year || "N/D"}
                </Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#101820" },
  volver: { color: "#40E0D0", fontSize: 16, marginBottom: 10 },
  title: { fontSize: 32, fontWeight: "bold", color: "white", marginBottom: 20 },
  modos: { flexDirection: "row", marginBottom: 15 },
  modo: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "#182533",
    marginRight: 10,
  },
  modoActivo: { backgroundColor: "#40E0D0" },
  modoTexto: { color: "#AAA", fontWeight: "bold" },
  modoTextoActivo: { color: "#101820" },
  buscador: { flexDirection: "row", marginBottom: 20 },
  input: {
    flex: 1,
    backgroundColor: "#182533",
    color: "white",
    borderRadius: 15,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  boton: {
    backgroundColor: "#40E0D0",
    borderRadius: 15,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  botonTexto: { color: "#101820", fontWeight: "bold" },
  cargando: { marginTop: 40 },
  mensaje: { color: "#AAA", textAlign: "center", marginTop: 40 },
  card: {
    flexDirection: "row",
    backgroundColor: "#182533",
    borderRadius: 20,
    marginBottom: 15,
    overflow: "hidden",
  },
  portada: { width: 80, height: 120, backgroundColor: "#0b1218" },
  sinPortada: { justifyContent: "center", alignItems: "center" },
  sinPortadaTexto: { color: "#777", fontSize: 12 },
  info: { flex: 1, padding: 15, justifyContent: "center" },
  cardTitle: { fontSize: 18, fontWeight: "bold", color: "#40E0D0" },
  cardSub: { color: "#AAA", marginTop: 4 },
});
