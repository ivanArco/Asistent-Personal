import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Platform, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';

const HomeScreen = ({ navigation }) => {
  const [name, setName] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.animationContainer}>
        <LottieView
          source={require('./assets/robot.json')}
          autoPlay
          loop
          style={styles.animation}
        />
      </View>
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
    paddingTop: 30,
    overflow: 'hidden', // Prevent content overflow
  },
  animationContainer: {
    width: '100%',
    height: 200, // Set a fixed height for the animation container
    overflow: 'hidden', // Prevent overflow
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
    backgroundColor: '#FFC107',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  animation: {
    width: '100%',
    height: '100%',
  },
  text: {
    fontSize: 20,
    color: 'black',
    zIndex: 1,
  },
});

export default HomeScreen;