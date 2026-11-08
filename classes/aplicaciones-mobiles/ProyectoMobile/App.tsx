import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './pantallas/HomeScreen';
import ClimaScreen from './pantallas/ClimaScreen';
import PeliculasScreen from './pantallas/PeliculasScreen';
import DetallePeliculaScreen from './pantallas/DetallePeliculaScreen';
import LibrosScreen from './pantallas/LibrosScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Clima" component={ClimaScreen} />
        <Stack.Screen name="Peliculas" component={PeliculasScreen} />
        <Stack.Screen name="DetallePelicula" component={DetallePeliculaScreen} />
        <Stack.Screen name="Libros" component={LibrosScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}