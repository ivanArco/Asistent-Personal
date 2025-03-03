import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegistroScreen from './paginas/Registrarse';
import IniciarSesionScreen from './paginas/IniciarSesion';
import HomeScreen from './AppScreen';
import Inicio from './paginas/Inicio';
import AgendaScreen from './paginas/Agenda';

const Stack = createStackNavigator();

const Stacknavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="IniciarSesion" component={IniciarSesionScreen} />
        <Stack.Screen name="Registro" component={RegistroScreen} />
        <Stack.Screen name="Inicio" component={Inicio}/>
        <Stack.Screen name="Agenda" component={AgendaScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Stacknavigator;

