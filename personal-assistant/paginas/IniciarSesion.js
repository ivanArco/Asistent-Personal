import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useFetch } from '../Hooks/useFetch';

// Función para validar correos electrónicos
const emailValidator = (email) => {
  if (!email) return 'El correo electrónico es obligatorio';
  return '';
};

// Función para validar contraseñas
const passwordValidator = (password) => {
  if (!password) return 'La contraseña es obligatoria';
  if (password.length < 6) return 'La contraseña debe tener al menos 6 caracteres';
  return '';
};

export function IniciarSesionScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const { getData } = useFetch();

  const Iniciar = async () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    try {
      const usuario = await getData('http://localhost:3000/api/users/byCorreo/' + email.value);

      if (usuario.error) {
        Alert.alert('Error', 'No se pudo obtener el usuario: ' + usuario.error);
        return;
      }

      const { data } = usuario;

      if (data.length > 0) {
        console.log('El usuario Existe');
        if (data[0].password === password.value) {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Inicio' }],
          });
        } else {
          Alert.alert('Error', 'La contraseña es incorrecta');
        }
      } else {
        Alert.alert('Error', 'El usuario no existe');
      }
    } catch (error) {
      console.error('Error durante el inicio de sesión:', error.message);
      Alert.alert('Error', 'Ocurrió un error inesperado');
    }
  };

  return (
    <View style={styles.container}>
    <Text style={styles.welcomeText}>Bienvenido a ECHO</Text>
    
    {/* Correo Electrónico */}
    <Text>Ingresa Tu Correo Electrónico</Text>
    <TextInput
        label="Correo"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        style={styles.input}
    />
    
    {/* Contraseña */}
    <Text>Ingresa una Contraseña</Text>
    <TextInput
        placeholder="Ingresa tu contraseña"
        accessibilityLabel="Campo para ingresar la contraseña"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        secureTextEntry
        style={styles.input}
    />

    {/* Botón de Inicio de Sesión */}
    <TouchableOpacity style={styles.addButton} onPress={Iniciar}>
        <Text style={styles.addButtonText}>Iniciar Sesión</Text>
    </TouchableOpacity>
    
    {/* Redirección al Registro */}
    <Text>¿No tienes una Cuenta?</Text>
    <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('Registro')}
    >
        <Text style={styles.addButtonText}>Regístrate</Text>
    </TouchableOpacity>
</View>

  );
}

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
  addButton: {
    backgroundColor: '#FFC107',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default IniciarSesionScreen;
