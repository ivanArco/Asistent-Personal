import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const RegistroScreen = ({ navigation }) => {
  // Estados para manejar los valores de los campos
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    if (!name || !age || !email || !password) {
      Alert.alert('Error', 'Por favor, complete todos los campos.');
    } else {

      Alert.alert('Registro Exitoso', `Bienvenido, ${name}`);
      navigation.navigate('Home');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Registro</Text>

      <Text>Nombre</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Ingresa tu nombre"
      />

      <Text>Edad</Text>
      <TextInput
        style={styles.input}
        value={age}
        onChangeText={setAge}
        placeholder="Ingresa tu edad"
        keyboardType="numeric"
      />

      <Text>Correo Electrónico</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Ingresa tu correo"
        keyboardType="email-address"
      />

      <Text>Contraseña</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Ingresa tu contraseña"
        secureTextEntry
      />

      <Button title="Registrarse" onPress={() => navigation.navigate('Inicio',{name:name})} />

      <Text>¿Ya tienes cuenta?</Text>
      <Button
        title="Iniciar sesión"
        onPress={() => navigation.navigate('IniciarSesion')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    width: '80%',
    height: 40,
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
});

export default RegistroScreen;
