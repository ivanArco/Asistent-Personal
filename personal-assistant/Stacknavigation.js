import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegistroScreen from './paginas/Registrarse';
import IniciarSesionScreen from './paginas/IniciarSesion';
import HomeScreen from './AppScreen';
import Inicio from './paginas/Inicio';
import AgendaScreen from './paginas/Agenda';
import PerfilScreen from './paginas/Perfil';
import HistorialScreen from './paginas/Historial';
import SearchScreen from './paginas/Busquedas';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Inicio" 
          component={Inicio} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="IniciarSesion" 
          component={IniciarSesionScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Registro" 
          component={RegistroScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Agenda" 
          component={AgendaScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Historial" 
          component={HistorialScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Perfil" 
          component={PerfilScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Busquedas" 
          component={SearchScreen} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;