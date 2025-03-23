import React, { useState } from 'react';
import { Text, View, Button, StyleSheet, TextInput,TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';



const HomeScreen = ({ navigation }) => {
  const [name, setName] = useState('');

  return (

    <View style={styles.container}>

     <LottieView
        source={require('./assets/robot.json')}
        autoPlay
        loop
        style={styles.animation}
      />
    
      <Text style={styles.welcomeText}> Bienvenido a Tu Asistente Personal</Text>
      <Text style={styles.welcome}>Para continuar, necesito que me des un Nombre</Text>

      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
        placeholder="Escribe tu nombre..."
      />
      <Text style={styles.Text}>Perfecto! Mi Nombre será: {name} </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('IniciarSesion')}
      >
        <Text style={styles.buttonText}>Comenzar...</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 30,  // Ajusta el espacio desde la parte superior
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 250,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 4,
  },
  welcome: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  Text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  
  button: {
    backgroundColor: '#FFC107', // Cambia el color de fondo
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF', // Cambia el color del texto
    fontSize: 18,
    fontWeight: 'bold',
  },

  animation: {
    width: 300,  // Ajusta el tamaño de la animación en píxeles
    height: 200, // Ajusta el tamaño de la animación en píxeles
    position:'relative',
    marginBottom:10,
  },
  text: {
    fontSize: 20,
    color: 'black',
    zIndex: 1,  // Coloca el texto encima de la animación
  },

});

export default HomeScreen;
