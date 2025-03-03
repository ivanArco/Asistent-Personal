import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Para los iconos de la barra de navegación

const Inicio = ({ navigation }) => {
  const [peticion, setPeticion] = useState('');
  const [peticionesList, setPeticionesList] = useState([]);
  const [respuestasList, setRespuestasList] = useState([]);

  // const handlePeticion = () => {
  //   if (peticion.trim()) {
  //     setPeticionesList([...peticionesList, peticion]);
  //     setRespuestasList([...respuestasList, obtenerRespuesta(peticion)]);
  //     setPeticion('');
  //   } else {
  //     alert('Por favor ingresa una petición');
  //   }
  // };

  // const obtenerRespuesta = (peticion) => {
  //   const peticionLowerCase = peticion.toLowerCase();
  //   if (peticionLowerCase.includes('hora')) {
  //     return "La hora actual es: " + new Date().toLocaleTimeString();
  //   } else if (peticionLowerCase.includes('fecha')) {
  //     return "La fecha de hoy es: " + new Date().toLocaleDateString();
  //   } else if (peticionLowerCase.includes('clima')) {
  //     return "Lo siento, no puedo consultar el clima en este momento.";
  //   } else {
  //     return "Lo siento, no entendí tu petición. ¿Podrías intentar otra vez?";
  //   }
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Bienvenido a Tu Asistente Personal</Text>

      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>¿Qué quieres hacer...?</Text>
        <Ionicons name="volume-high" size={20} color="#FFC107" style={styles.soundIcon} />
      </View>

      <Text style={styles.noTareasText}>Aún no hay Tareas Agregadas</Text>


       <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('Agenda')}
      >
        <View style={styles.buttonContent}>
          <Ionicons name="document-outline" size={20} color="#FFFFFF" />
          <Text style={styles.addButtonText}>Agregar una Tarea</Text>
        </View>
      </TouchableOpacity>



      <TouchableOpacity
        style={[styles.addButton, { marginTop: 10 }]}
        onPress={() => navigation.navigate('AgendaScreen')}
      >
        <View style={styles.buttonContent}>
          <Ionicons name="list-outline" size={20} color="#FFFFFF" />
          <Text style={styles.addButtonText}>Ver lista de tareas</Text>
        </View>
      </TouchableOpacity>
      </View>


      {/* <ScrollView style={styles.peticionesContainer}>
        {peticionesList.map((peticion, index) => (
          <View key={index} style={styles.peticionItem}>
            <Text style={styles.peticionText}>{peticion}</Text>
            <Text style={styles.respuestaText}>Respuesta: {respuestasList[index]}</Text>
          </View>
        ))}
      </ScrollView> */}

      <View style={styles.bottomNav}>
        <Ionicons name="home" size={24} color="black" />
        <Ionicons name="list" size={24} color="black" />
        <Ionicons name="chatbubble" size={24} color="black" />
        <Ionicons name="person" size={24} color="black" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 20,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  questionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
  },
  soundIcon: {
    marginLeft: 5,
  },
  noTareasText: {
    fontSize: 16,
    color: '#888',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#FFC107',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    //flex: 1, // Para que los botones se expandan de forma uniforme
    //alignItems: 'center',
    //marginHorizontal: 5, // Agrega espacio entre los botones
  },
  addButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 8,  // Espacio entre el icono y el texto
  },
  peticionesContainer: {
    marginTop: 20,
    width: '100%',
    maxHeight: 200,
    
  },
  peticionItem: {
    backgroundColor: '#f8f9fa',
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
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: '#FFC107',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
  },
  buttonContent: {
    flexDirection: 'row',  // Alinea los elementos en una fila
    alignItems: 'center',  // Alinea verticalmente el icono y el texto
  },
  
});

export default Inicio;
