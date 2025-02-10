import React, { useState } from 'react';
import { Text, View, Button, TextInput, StyleSheet, Alert } from 'react-native';

const IniciarSesionScreen = ({ navigation }) => {
  const [text, setText] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
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

      <Button
        title="Iniciar Sesion"
        onPress={() => navigation.navigate('Inicio')}
      />
      <Text> No tienes una Cuenta </Text>

      <Button
        title="Registrate..."
        onPress={() => navigation.navigate('Registro')}
      />
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
});

export default IniciarSesionScreen;
