import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useFetch } from '../Hooks/useFetch';

// Validadores de los campos
const nameValidator = (name) => {
  if (!name) return 'El nombre es obligatorio';
  return '';
};

const edadValidator = (edad) => {
  if (!edad) return 'La edad es obligatoria';
  if (isNaN(edad)) return 'La edad debe ser un número';
  return '';
};

const emailValidator = (email) => {
  if (!email) return 'El correo electrónico es obligatorio';
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailRegex.test(email)) return 'Correo electrónico no válido';
  return '';
};

const passwordValidator = (password) => {
  if (!password) return 'La contraseña es obligatoria';
  if (password.length < 6) return 'La contraseña debe tener al menos 6 caracteres';
  return '';
};

export function RegistroScreen({ navigation }) {
  const [name, setName] = useState({ value: '', error: '' });
  const [edad, setEdad] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });

  const { getData, setData } = useFetch();

  const onSignUpPressed = async () => {
    
      const nameError = nameValidator(name.value);
      const edadError = edadValidator(edad.value);
      const emailError = emailValidator(email.value);
      const passwordError = passwordValidator(password.value);
  
      if (emailError || edadError || passwordError || nameError) {
        setName({ ...name, error: nameError });
        setEdad({ ...edad, error: edadError });
        setEmail({ ...email, error: emailError });
        setPassword({ ...password, error: passwordError });
        return;
      }
  
      const usuario = await getData('http://localhost:3000/api/users/byCorreo/' + email.value);
      if (usuario.error) return;
      const { data } = usuario;
      if (data.length > 0) return;

      const nuevoUsuario = {
        Nombre: name.value,
        Edad: edad.value,
        Correo: email.value,
        Password: password.value,
      }
  
        const nuevo = await setData('http://localhost:3000/api/users/add', nuevoUsuario);
  
        if (nuevo.error) {
          Alert.alert('Error', 'Ocurrió un error al crear el usuario');
          return;
        }
  
        navigation.reset({
          index: 0,
          routes: [{ name: 'Inicio' }],
        })
      
  }
  

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Registro</Text>

      <Text>Nombre</Text>
      <TextInput
        label="Nombre"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
        style={styles.input}
      />

      <Text>Edad</Text>
      <TextInput
        label="Edad"
        returnKeyType="next"
        value={edad.value}
        onChangeText={(text) => setEdad({ value: text, error: '' })}
        error={!!edad.error}
        errorText={edad.error}
        style={styles.input}
      />

      <Text>Correo Electrónico</Text>
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

      <Text>Contraseña</Text>
      <TextInput
        label="Contraseña"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity style={styles.addButton} onPress={onSignUpPressed}>
        <Text style={styles.addButtonText}>Registrar</Text>
      </TouchableOpacity>

      <Text>¿Ya tienes cuenta?</Text>
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('IniciarSesion')}>
        <Text style={styles.addButtonText}>Iniciar Sesión</Text>
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
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
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
});

export default RegistroScreen;