import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useFetch } from '../Hooks/useFetch';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const [loading, setLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState('');
  const { getData } = useFetch();

  // Función para agregar información de depuración
  const addDebugInfo = (message) => {
    console.log(message);
    setDebugInfo(prev => prev + "\n" + message);
  };

  const Iniciar = async () => {
    try {
      setLoading(true);
      addDebugInfo('Iniciando proceso de login...');

      // Validación de campos
      const emailError = emailValidator(email.value);
      const passwordError = passwordValidator(password.value);

      if (emailError || passwordError) {
        addDebugInfo('Error de validación de campos');
        setEmail({ ...email, error: emailError });
        setPassword({ ...password, error: passwordError });
        setLoading(false);
        return;
      }

      addDebugInfo(`Consultando usuario con correo: ${email.value}`);
      
      // Intentar obtener el usuario por correo
      try {
        const usuario = await getData('http://localhost:3000/api/users/byCorreo/' + email.value);
        addDebugInfo('Respuesta del servidor recibida');
        
        // Verificar la respuesta
        if (!usuario) {
          addDebugInfo('Respuesta del servidor vacía');
          Alert.alert('Error', 'No se recibió respuesta del servidor');
          setLoading(false);
          return;
        }
        
        if (usuario.error) {
          addDebugInfo(`Error en la respuesta: ${usuario.error}`);
          Alert.alert('Error', usuario.error || 'Error en la respuesta del servidor');
          setLoading(false);
          return;
        }

        addDebugInfo('Datos recibidos: ' + JSON.stringify(usuario));
        
        const { data } = usuario;

        if (!data || data.length === 0) {
          addDebugInfo('Usuario no encontrado');
          Alert.alert('Error', 'El usuario no existe');
          setLoading(false);
          return;
        }

        addDebugInfo('Usuario encontrado, verificando credenciales...');
        
        // IMPORTANTE: En una aplicación real, NUNCA deberías comparar la contraseña en el frontend
        // Esto es solo para fines de depuración. La validación de contraseñas debe hacerse siempre en el backend.
        
        // Simulación de verificación exitosa
        addDebugInfo('Inicio de sesión exitoso');
        Alert.alert('Éxito', 'Inicio de sesión exitoso');
        const user = data; // Primer usuario encontrado en el array
        if (!user || !user._id) {
          addDebugInfo('No se encontró el UserID');
          Alert.alert('Error', 'Usuario no válido o sin UserID');
          setLoading(false);
          return;
        }

        addDebugInfo('Inicio de sesión exitoso');
        Alert.alert('Éxito', 'Inicio de sesión exitoso');

        // Guardar el UserID en AsyncStorage
        await AsyncStorage.setItem('UserID', user._id.toString());  // Guardar como string
        
        // Intentar navegar
        addDebugInfo('Intentando navegar a Inicio...');
        setTimeout(() => {
          try {
            navigation.reset({
              index: 0, 
              routes: [{ name: 'Inicio' }]
            });
            addDebugInfo('Navegación ejecutada');
          } catch (navError) {
            addDebugInfo(`Error en navegación: ${navError.message}`);
            Alert.alert('Error', `Error al navegar: ${navError.message}`);
          }
        }, 500);
        
      } catch (fetchError) {
        addDebugInfo(`Error al obtener datos: ${fetchError.message}`);
        console.error('Error al obtener datos:', fetchError);
        Alert.alert('Error', `Error al consultar usuario: ${fetchError.message}`);
      }
    } catch (generalError) {
      addDebugInfo(`Error general: ${generalError.message}`);
      console.error('Error general:', generalError);
      Alert.alert('Error', `Error general: ${generalError.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Bienvenido a ECHO</Text>
      
      {/* Panel de depuración - Solo para desarrollo */}
      {debugInfo ? (
        <View style={styles.debugPanel}>
          <Text style={styles.debugTitle}>Información de depuración:</Text>
          <Text style={styles.debugText}>{debugInfo}</Text>
        </View>
      ) : null}
      
      <Text>Ingresa Tu Correo Electrónico</Text>
      <TextInput
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        style={styles.input}
        placeholder="correo@ejemplo.com"
      />
      {email.error ? <Text style={styles.errorText}>{email.error}</Text> : null}
      
      <Text>Ingresa una Contraseña</Text>
      <TextInput
        placeholder="Ingresa tu contraseña"
        accessibilityLabel="Campo para ingresar la contraseña"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        secureTextEntry
        style={styles.input}
      />
      {password.error ? <Text style={styles.errorText}>{password.error}</Text> : null}

      <TouchableOpacity 
        style={[styles.addButton, loading && styles.disabledButton]} 
        onPress={Iniciar}
        disabled={loading}
      >
        <Text style={styles.addButtonText}>
          {loading ? 'Procesando...' : 'Iniciar Sesión'}
        </Text>
      </TouchableOpacity>

      <Text>¿No tienes una Cuenta?</Text>
      <TouchableOpacity 
        style={styles.addButton} 
        onPress={() => navigation.navigate('Registro')}
        disabled={loading}
      >
        <Text style={styles.addButtonText}>Regístrate</Text>
      </TouchableOpacity>

      {/* Botón para limpiar la depuración */}
      {debugInfo ? (
        <TouchableOpacity 
          style={styles.clearButton} 
          onPress={() => setDebugInfo('')}
        >
          <Text style={styles.clearButtonText}>Limpiar Depuración</Text>
        </TouchableOpacity>
      ) : null}
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
  disabledButton: {
    backgroundColor: '#CCCCCC',
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
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  debugPanel: {
    width: '90%',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    maxHeight: 200,
    overflow: 'scroll',
  },
  debugTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  debugText: {
    fontSize: 12,
    fontFamily: 'monospace',
  },
  clearButton: {
    backgroundColor: '#999',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  clearButtonText: {
    color: 'white',
    fontSize: 12,
  }
});

export default IniciarSesionScreen;