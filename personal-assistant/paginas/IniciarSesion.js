import React, { useState } from 'react';
import { Text, View, Button, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';

const IniciarSesionScreen = ({ navigation }) => {
  const [text, setText] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
       <Text style={styles.welcomeText}>Bienvenido a ECHO </Text>
      <Text> Ingresa Tu Correo Electronico</Text>
      <TextInput
        style={styles.input}
        onChangeText={setText}
        value={text}
      />
      <Text>Ingresa una Contraseña</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
      />

      {/* <Button
        title="Iniciar Sesion"
        onPress={() => navigation.navigate('Inicio')}
      /> */}
       <TouchableOpacity
        style={styles.addButton} // Estilo personalizado para el botón
        onPress={() => navigation.navigate('Inicio')}
      >
        <Text style={styles.addButtonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <Text> ¿No tienes una Cuenta? </Text>

      <TouchableOpacity
        style={styles.addButton} // Estilo personalizado para el botón
        onPress={() => navigation.navigate('Registro')}
      >
        <Text style={styles.addButtonText}>Registrate</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 250,
  },
  addButton: {
    backgroundColor: '#FFC107',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default IniciarSesionScreen;
