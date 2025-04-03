import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Para los iconos de la barra de navegación

const PerfilScreen = ({ navigation }) => {
  const [peticion, setPeticion] = useState('');
  const [peticionesList, setPeticionesList] = useState([]);
  const [respuestasList, setRespuestasList] = useState([]);



  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Perfil</Text>

      
      <TouchableOpacity onPress={() => navigation.navigate('Perfil')} style={styles.iconContainer}>
          <Ionicons name="person-circle-sharp" size={100} color="black" />
        </TouchableOpacity>

        <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.addButton, styles.whiteButton]}
          onPress={() => navigation.navigate('Home')}
        >
          <View style={styles.buttonContent}>
            <Text style={styles.addButtonText}>Acerca de</Text>
            <Ionicons name="information-circle-outline" size={24} color="black" />
          </View>
        </TouchableOpacity>

      </View>




      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('Home')}
        >
          <View style={styles.buttonContent}>
            <Text style={styles.addButtonText}>Cerrar Sesion</Text>
          </View>
        </TouchableOpacity>

      </View>


    

      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate('Inicio')} style={styles.iconContainer}>
          <Ionicons name="home" size={24} color="black" />
          <Text style={styles.iconLabel}>Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Historial')} style={styles.iconContainer}>
          <Ionicons name="list" size={24} color="black" />
          <Text style={styles.iconLabel}>Consultas</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Busquedas')} style={styles.iconContainer}>
           <Ionicons name="search-sharp" size={24} color="black" />
          <Text style={styles.iconLabel}>Preguntar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Perfil')} style={styles.iconContainer}>
          <Ionicons name="person-circle-sharp" size={24} color="black" />
          <Text style={styles.iconLabel}>Perfil</Text>
        </TouchableOpacity>
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
    color: '#000000',
    fontWeight: 'bold',
    marginLeft: 8,  // Espacio entre el icono y el texto
  },
  peticionesContainer: {
    marginTop: 20,
    width: '100%',
    maxHeight: 200,

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
  buttonContainer: {
    marginVertical: 10, // Espacio entre los botones
  },
  buttonContent: {
    flexDirection: 'row', // Los elementos (ícono y texto) estarán en fila
    alignItems: 'center', // Centra verticalmente el ícono y el texto
  },
  icon: {
    marginRight: 20, // Espacio entre el ícono y el texto
  },
  addButtonText: {
    color: 'white', // Color del texto
    fontSize: 16, // Tamaño del texto
    marginLeft: 10, // Espacio entre el ícono y el texto
  },
  whiteButton: {
    backgroundColor: 'white', // Fondo blanco para el botón
    borderWidth: 1, // Agrega borde para diferenciarlo
    borderColor: 'black', // Borde verde (el mismo color que el otro botón)
  },
  whiteButtonText: {
    color: '#000000', // Texto verde en el botón blanco
  },
 

});

export default PerfilScreen;
