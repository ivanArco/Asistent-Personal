import React, { useState, useEffect } from 'react';
import { Text, View, Button, TextInput, StyleSheet, Alert, TouchableOpacity, FlatList, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useFetch } from '../Hooks/useFetch';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { getData, setData } = useFetch();

function textValidator(name) {
  if (!name) return "El campo no puede estar vacío";
  return '';
}

// Mostrar la fecha con formato local
const formatoFecha = (fecha) => {
  if (fecha instanceof Date && !isNaN(fecha)) {
    return fecha.toLocaleDateString('es-ES');
  }
  return 'Fecha no válida';
};

const AgendaScreen = ({ navigation }) => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [tareas, setTareas] = useState([]);
  const [userID, setUserID] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar tareas del servidor cuando se monta el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userIdFromStorage = await AsyncStorage.getItem('UserID');
        if (userIdFromStorage) {
          setUserID(userIdFromStorage);
          
          // Obtener tareas del servidor para este usuario
          const tareasFromServer = await getData(`http://192.168.100.57:3000/api/pendientes/usuario/${userIdFromStorage}`);
          if (Array.isArray(tareasFromServer)) {
            console.log("Tareas obtenidas:", tareasFromServer);
            setTareas(tareasFromServer);
          } else {
            console.log("La respuesta del servidor no es un array:", tareasFromServer);
            setTareas([]);
          }
        } else {
          console.log("No se encontró el UserID en AsyncStorage");
          setTareas([]);
        }
      } catch (error) {
        console.error("Error al obtener datos:", error);
        setTareas([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Función para agregar una tarea
  const agregarTarea = async () => {
    const tituloError = textValidator(titulo);
    const descripcionError = textValidator(descripcion);

    if (tituloError || descripcionError) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    if (titulo && descripcion && fecha) {
      const nuevaTarea = {
        Titulo: titulo,
        Descripcion: descripcion,
        Fecha: fecha.toISOString(),
        Estado: 'Pendiente',
        Prioridad: 'Media',
        FechaCreacion: new Date().toISOString(),
        FechaActualizacion: new Date().toISOString(),
        Usuario: userID,
      };
      
      try {
        const tareaGuardada = await setData('http://192.168.100.57:3000/api/pendientes/add', nuevaTarea);
        console.log("Tarea guardada:", tareaGuardada);
        
        // Asegurarse de que la tarea guardada tenga los nombres de propiedades correctos para el FlatList
        const tareaFormateada = {
          _id: tareaGuardada._id || Math.random().toString(),
          titulo: tareaGuardada.Titulo || titulo,
          descripcion: tareaGuardada.Descripcion || descripcion,
          fecha: tareaGuardada.Fecha || fecha.toISOString(),
          estado: tareaGuardada.Estado || 'Pendiente'
        };
        
        const tareasActualizadas = Array.isArray(tareas) ? [...tareas, tareaFormateada] : [tareaFormateada];
        setTareas(tareasActualizadas);
        
        setTitulo('');
        setDescripcion('');
        setFecha(new Date());
        
        Alert.alert('Éxito', 'Tarea guardada correctamente');
      } catch (error) {
        console.error("Error al guardar tarea:", error);
        Alert.alert('Error', 'Hubo un problema al conectar con el servidor.');
      }
    } else {
      Alert.alert('Por favor, completa todos los campos');
    }
  };

  // Manejar el cambio de la fecha seleccionada
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || fecha;
    setShowPicker(Platform.OS === 'ios');
    setFecha(currentDate);
  };

  // Función segura para obtener las tareas recientes
  const getTareasRecientes = () => {
    if (!Array.isArray(tareas)) {
      console.log("tareas no es un array:", tareas);
      return [];
    }
    return tareas.slice(0, 3);
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
        multiline={true}
        numberOfLines={3}
      />

      {/* TouchableOpacity para mostrar el selector de fecha */}
      <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.input}>
        <Text>Fecha: {formatoFecha(fecha)}</Text>
      </TouchableOpacity>

      {/* DateTimePicker */}
      {showPicker && (
        <DateTimePicker
          value={fecha}
          mode="date"
          display="default"
          onChange={onChange}
          minimumDate={new Date()}
          locale="es-ES"
        />
      )}

      <View style={styles.buttonContainer}>
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
        onPress={() => navigation.navigate('ListaTareas')}
      >
        <View style={styles.buttonContent}>
          <Ionicons name="list-outline" size={20} color="#FFFFFF" />
          <Text style={styles.addButtonText}>Ver lista de tareas</Text>
        </View>
      </TouchableOpacity>
      
      <View style={styles.listHeaderContainer}>
        <Text style={styles.listHeader}>Tareas recientes</Text>
      </View>

      {loading ? (
        <Text style={styles.loadingText}>Cargando tareas...</Text>
      ) : (
        <FlatList
          data={getTareasRecientes()}
          keyExtractor={(item) => item._id ? item._id.toString() : Math.random().toString()}
          renderItem={({ item }) => {
            // Garantizar que tenemos una fecha para mostrar
            let fechaStr = 'Fecha no disponible';
            try {
              // Intentamos extraer la fecha de diferentes propiedades posibles
              const fechaValue = item.fecha || item.Fecha;
              if (fechaValue) {
                const fechaTarea = new Date(fechaValue);
                if (fechaTarea instanceof Date && !isNaN(fechaTarea)) {
                  fechaStr = fechaTarea.toLocaleDateString('es-ES');
                }
              }
            } catch (e) {
              console.error("Error al formatear fecha:", e);
            }

            // Garantizar que tenemos un título para mostrar
            const tituloTarea = item.titulo || item.Titulo || 'Sin título';

            return (
              <View style={styles.tareaContainer}>
                <Text style={styles.tareaTitulo}>{tituloTarea}</Text>
                <Text style={styles.tareaDescripcion} numberOfLines={2}>
                  {item.descripcion || item.Descripcion || 'Sin descripción'}
                </Text>
                
                {/* Fecha en un contenedor destacado para asegurar visibilidad */}
                <View style={styles.fechaContainer}>
                  <Ionicons name="calendar" size={16} color="#666" style={styles.fechaIcon} />
                  <Text style={styles.tareaFecha}>{fechaStr}</Text>
                </View>
                
                <View style={styles.tareaEstado}>
                  <Text style={styles.estadoText}>{item.estado || item.Estado || 'Pendiente'}</Text>
                </View>
              </View>
            );
          }}
          style={styles.flatList}
          ListEmptyComponent={
            <View style={styles.emptyListContainer}>
              <Ionicons name="calendar-outline" size={40} color="#CCC" />
              <Text style={styles.emptyList}>No hay tareas pendientes</Text>
            </View>
          }
        />
      )}

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
    paddingTop: 50,
    paddingBottom: 70,
    paddingHorizontal: 20,
    backgroundColor: '#F5F5F5',
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 10,
    width: '90%',
    backgroundColor: '#FFFFFF',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '90%',
    marginTop: 10,
  },
  addButton: {
    backgroundColor: '#FFC107',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
    elevation: 3,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  listHeaderContainer: {
    width: '100%',
    paddingLeft: 15,
    marginTop: 20,
    marginBottom: 10,
  },
  listHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  flatList: {
    width: '95%',
    maxHeight: 250,
    marginBottom: 5,
  },
  tareaContainer: {
    marginBottom: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  tareaTitulo: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  tareaDescripcion: {
    color: '#555',
    marginBottom: 8,
  },
  fechaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    padding: 6,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginVertical: 5,
  },
  fechaIcon: {
    marginRight: 4,
  },
  tareaFecha: {
    color: '#666',
    fontWeight: '500',
  },
  tareaEstado: {
    marginTop: 8,
    alignSelf: 'flex-start',
    backgroundColor: '#FFC107',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  estadoText: {
    fontSize: 12,
    color: '#333',
    fontWeight: 'bold',
  },
  emptyListContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyList: {
    textAlign: 'center',
    color: '#666',
    marginTop: 10,
  },
  loadingText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: 60,
    backgroundColor: '#FFC107',
    position: 'absolute',
    bottom: 0,
    left: 0,
    paddingVertical: 5,
    elevation: 5,
  },
  iconContainer: {
    alignItems: 'center',
  },
  iconLabel: {
    fontSize: 12,
    marginTop: 2,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AgendaScreen;