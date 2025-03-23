import React, { useState } from 'react';
import { Text, View, Button, TextInput, StyleSheet, Alert, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const HistorialScreen = ({ navigation }) => {
  // Definir el estado para las consultas
  const [consultas, setConsultas] = useState([
    'Consulta 1: Buscar tarea de React Native',
    'Consulta 2: ¿Cómo usar FlatList?',
    'Consulta 3: ¿Qué es un useState?',
    // Puedes agregar más consultas aquí
  ]);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de Consultas</Text>
      <FlatList
        data={consultas}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item}</Text>
          </View>
        )}
      />





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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
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

  text: {
    fontSize: 20,
    color: 'black',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  
});

export default HistorialScreen;  