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
    console.log("1. Iniciando proceso de registro");
    
    const nameError = nameValidator(name.value);
    const edadError = edadValidator(edad.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
  
    if (emailError || edadError || passwordError || nameError) {
      console.log("2. Error en validaciones");
      setName({ ...name, error: nameError });
      setEdad({ ...edad, error: edadError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
  
    try {
      // Saltamos la verificación previa ya que las rutas no existen
      console.log("3. Preparando nuevo usuario para registro");
      const nuevoUsuario = {
        Nombre: name.value,
        Edad: edad.value,
        Correo: email.value,
        Password: password.value,
      }
      console.log("4. Datos de nuevo usuario:", nuevoUsuario);
  
      console.log("5. Enviando solicitud para crear usuario");
      const nuevo = await setData('http://localhost:3000/api/users/add', nuevoUsuario);
      console.log("6. Respuesta de creación:", nuevo);
  
      if (nuevo.error) {
        // Si el servidor devuelve un error, podría ser porque el usuario ya existe
        console.log("7. Error al crear usuario:", nuevo.message);
        
        // Comprueba si el mensaje de error contiene información sobre duplicación
        if (nuevo.message && nuevo.message.includes("duplicate") || 
            nuevo.message && nuevo.message.includes("ya existe")) {
          Alert.alert('Error', 'Ya existe un usuario con este correo electrónico');
        } else {
          Alert.alert('Error', 'Ocurrió un error al crear el usuario: ' + nuevo.message);
        }
        return;
      }
  
      console.log("8. Usuario creado exitosamente, redirigiendo");
      // Guardar el ID del usuario si lo devuelve la API
      if (nuevo.data && nuevo.data._id) {
        try {
          await AsyncStorage.setItem('UserID', nuevo.data._id.toString());
          console.log("ID de usuario guardado:", nuevo.data._id);
        } catch (storageError) {
          console.error("Error al guardar ID:", storageError);
        }
      }
      
      navigation.reset({
        index: 0,
        routes: [{ name: 'Inicio' }],
      });
    } catch (error) {
      console.error("Error en el proceso de registro:", error);
      Alert.alert('Error', 'Ocurrió un error inesperado durante el registro');
    }
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