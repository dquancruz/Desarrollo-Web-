import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import axios from "axios";

export default function WeatherScreen() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get("https://api.open-meteo.com/v1/forecast?latitude=14&longitude=-90&current_weather=true")
      .then((res) => setWeather(res.data.current_weather))
      .catch((err) => console.log(err));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Clima Actual </Text>

      {weather ? (
        <View style={styles.box}>
          <Text style={styles.temp}>{weather.temperature}°C</Text>
          <Text style={styles.text}>Viento: {weather.windspeed} km/h</Text>
        </View>
      ) : (
        <Text style={styles.text}>Cargando...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#101820", flex: 1 },
  title: { fontSize: 30, color: "white", marginBottom: 20 },
  box: { backgroundColor: "#182533", padding: 20, borderRadius: 15 },
  temp: { fontSize: 40, color: "#40E0D0" },
  text: { color: "white", marginTop: 10 },
});