import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button, ScrollView } from 'react-native';

const Incio = ({ name }) => {

  //estado para la peticion del usuario
  const [peticion, setPeticion] = useState('');

  //estado para almacenar las peticiones enviadas
  const [peticionesList, setPeticionesList] = useState([]);

  //estado par ALMACENAR las respuestas
  const [respuestasList, setRespuestasList]= useState([]);

//API Key OpenWeatherMap 


  // Función para manejar el envío de la petición
  const handlePeticion = () => {
    if (peticion.trim()) {
      setPeticionesList([...peticionesList, peticion]); // Añadir la nueva petición a la lista
        
      //logica para generar la respuesta del asistente
      const respuesta=obtenerRespuesta(peticion);

       
      // Añadir la respuesta a la lista
      setRespuestasList([...respuestasList, respuesta]);

      setPeticion(''); // Limpiar el campo de entrada después de enviar
    } else {
      alert('Por favor ingresa una petición');
    }
  };

//funcion para obtener la respuesta del asistente
const obtenerRespuesta= (peticion)=> {
  const peticionLowerCase =peticion.toLowerCase();

  //peticiones predeterminadas

  if (peticionLowerCase.includes('hora')) {
    return "La hora actual es:" + new Date().toLocaleTimeString();
  } else if (peticionLowerCase.includes('fecha')) {
    return "La fecha de hoy es:" + new Date().toLocaleDateString();
  } else if (peticionLowerCase.includes('clima')){
    return "Lo siento, no puedo consultar el clima en este momento.";
  } else {
    return "Lo siento, no entendi tu peticion. ¿Podrias intentar otra vez?";
  }
}




  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}> Bienvenido {name}</Text>

      <Text style={styles.questionText}> ¿Que Quieres Hacer? </Text>

      {/* Bloque para escribir la petición */}
      <TextInput
        style={styles.input}
        placeholder="Escribe tu petición aquí..."
        value={peticion}
        onChangeText={setPeticion}
      />

       {/* Botón para enviar la petición */}
      <Button title="Enviar Petición" onPress={handlePeticion} />

       {/* Mostrar las peticiones enviadas y las respuestas*/}
      <ScrollView style={styles.peticionesContainer}>
        {peticionesList.map((peticion, index) => (
          <View key={index} style={styles.peticionItem}>
            <Text style={styles.peticionText}>{peticion}</Text>
            <Text style={styles.respuestaText}>Respuesta: {respuestasList[index]}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifycontent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,

  },

  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007BFF',
    marginBottom: 20,

  },
  questionText: {
    fontzise: 18,
    color: '#495057',
    textAlign: 'center',
    marginTop: 10,
  },
  
  input: {
    height: 40,
    width: '100%',
    marginVertical: 20,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: '#007BFF',
    fontSize: 16,
    backgroundColor: '#fff',
  },
  peticionesContainer: {
    marginTop: 20,
    width: '100%',
    maxHeight: 200,
  },
  peticionItem: {
    backgroundColor: '#e9ecef',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  peticionText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  respuestaText: {
    fontSize: 16,
    color: '#007BFF',
  },

})

export default Incio;