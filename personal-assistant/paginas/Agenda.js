import React, { useState } from 'react';
import { Text, View, Button, TextInput, StyleSheet, Alert, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';

const AgendaScreen = ({ navigation }) => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState('');
  const [tareas, setTareas] = useState([]);


  //Funcion para agregar una tarea
  const agregarTarea = () => {
    if (titulo && descripcion && fecha) {
      const nuevaTarea = { titulo, descripcion, fecha };
      setTareas([...tareas, nuevaTarea]); //añadir la tarea al estado de tareas
      setTitulo(''); //limpiar los campos de texto
      setDescripcion('');
      setFecha('');
    } else {
      alert('Por favor, completa todos los campos');
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Agregar Pendiente</Text>

      <TextInput
        style={styles.input}
        onChangeText={setTitulo}
        value={titulo}
        placeholder="Título"
      />

      <TextInput
        style={styles.input}
        onChangeText={setDescripcion}
        value={descripcion}
        placeholder="Descripción"
      />

      <TextInput
        style={styles.input}
        onChangeText={setFecha}
        value={fecha}
        placeholder="Fecha"
      />

      <View style={styles.container}>
        <Entypo name="mic" size={70} color="#FFC107" />


        {/* Botón para agregar tarea */}
        <TouchableOpacity style={styles.addButton} onPress={agregarTarea}>
          <View style={styles.buttonContent}>
            <Ionicons name="cloud-done" size={20} color="#FFFFFF" />
            <Text style={styles.addButtonText}>Guardar Tarea</Text>
          </View>
        </TouchableOpacity>

        </View>

        <TouchableOpacity
                style={[styles.addButton, { marginTop: 10 }]}
                onPress={() => navigation.navigate('')}
              >
                <View style={styles.buttonContent}>
                  <Ionicons name="list-outline" size={20} color="#FFFFFF" />
                  <Text style={styles.addButtonText}>Ver lista de tareas</Text>
                </View>
              </TouchableOpacity>
              


      {/* Lista de tareas */}
      <FlatList
        data={tareas}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.tareaContainer}>
            <Text style={styles.tareaTitulo}>{item.titulo}</Text>
            <Text>{item.descripcion}</Text>
            <Text>{item.fecha}</Text>
          </View>
        )}
      />

      {/* Menú de navegación inferior */}
      
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
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 250,
  },
  addButton: {
    backgroundColor: '#FFC107',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop:20,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  tareaContainer: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  tareaTitulo: {
    fontWeight: 'bold',
    fontSize: 16,
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },



});

export default AgendaScreen;
