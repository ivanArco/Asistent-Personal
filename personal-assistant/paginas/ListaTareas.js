import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, ScrollView, ActivityIndicator, Modal, Alert } from 'react-native';
import { Feather } from 'react-native-vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useFetch } from '../Hooks/useFetch';

const ListaDeTareas = ({ navigation }) => {
  const [tabActivo, setTabActivo] = useState('Realizadas');
  const [tareas, setTareas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [tareaSeleccionada, setTareaSeleccionada] = useState(null);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [estadoEditado, setEstadoEditado] = useState('');
  const [prioridadEditada, setPrioridadEditada] = useState('');
  const [fechaEditada, setFechaEditada] = useState('');
  const [mostrarDatePicker, setMostrarDatePicker] = useState(false);
  
  const { getData, setData, updateData, deleteData } = useFetch();
  const TipoEstado = ["Pendiente", "Completado"];
  const TipoPrioridad = ["Baja", "Media", "Alta"];

  // Función para cargar tareas
  const cargarTareas = async () => {
    try {
      const idUsuario = await AsyncStorage.getItem('UserID');
      
      if (!idUsuario) {
        // Si no hay usuario, continuar con lista vacía
        setTareas([]);
        setCargando(false);
        return;
      }
      
      console.log('Cargando tareas para el usuario ID:', idUsuario);
      
      // Obtener datos de la API
      const resultado = await getData(`http://192.168.100.57:3000/api/pendientes/usuario/${idUsuario}`);
      console.log('Datos recibidos de la API:', resultado);
      
      if (resultado && resultado.data && Array.isArray(resultado.data)) {
        // Por si los datos vienen dentro de un objeto con propiedad 'data'
        const tareasFormateadas = resultado.data.map(tarea => ({
          id: tarea._id,
          titulo: tarea.Titulo,
          descripcion: tarea.Descripcion,
          estado: tarea.Estado,
          prioridad: tarea.Prioridad,
          fecha: tarea.Fecha
        }));
        
        setTareas(tareasFormateadas);
      } else {
        // Si no hay datos, usar lista vacía
        setTareas([]);
      }
    } catch (error) {
      console.error('Error al cargar tareas:', error);
      // En caso de error, usar lista vacía
      setTareas([]);
    } finally {
      setCargando(false);
    }
  };

  // Función para actualizar tarea
  const actualizarTarea = async () => {
    try {
      const idUsuario = await AsyncStorage.getItem('UserID');
      
      // Imprimir el ID de la tarea que estás tratando de actualizar
      console.log('ID de tarea a actualizar:', tareaSeleccionada.id);
      
      const datosActualizacion = {
        usuario: idUsuario, // Cambiado de usuarioId a usuario para coincidir con el backend
        Estado: estadoEditado,
        Prioridad: prioridadEditada,
        Fecha: fechaEditada
      };

      console.log('Datos de actualización:', datosActualizacion);
      
      const resultado = await updateData(
        `http://192.168.100.57:3000/api/pendientes/update/${tareaSeleccionada.id}`, 
        datosActualizacion
      );

      console.log('Respuesta completa del servidor:', resultado);
      
      if (!resultado.error) {
        console.log('Actualización exitosa, recargando tareas...');
        await cargarTareas();
        setModalVisible(false);
        setModoEdicion(false);
        Alert.alert('Éxito', 'La tarea ha sido actualizada');
      } else {
        console.error('Error al actualizar:', resultado.message);
        Alert.alert('Error', resultado.message || 'No se pudo actualizar la tarea');
      }
    } catch (error) {
      console.error('Error en la función actualizarTarea:', error);
      Alert.alert('Error', 'No se pudo actualizar la tarea');
    }
  };

  // Función para eliminar tarea
  const eliminarTarea = async () => {
    try {
      Alert.alert(
        'Eliminar Tarea',
        '¿Estás seguro de que quieres eliminar esta tarea?',
        [
          {
            text: 'Cancelar',
            style: 'cancel'
          },
          {
            text: 'Eliminar',
            style: 'destructive',
            onPress: async () => {
              try {
                console.log('Intentando eliminar tarea con ID:', tareaSeleccionada.id);
                
                const resultado = await deleteData(
                  `http://192.168.100.57:3000/api/pendientes/delete/${tareaSeleccionada.id}`
                );

                console.log('Respuesta de eliminación:', resultado);

                if (!resultado.error) {
                  console.log('Eliminación exitosa, recargando tareas...');
                  await cargarTareas();
                  setModalVisible(false);
                  Alert.alert('Éxito', 'La tarea ha sido eliminada');
                } else {
                  console.error('Error al eliminar:', resultado.message);
                  Alert.alert('Error', resultado.message || 'No se pudo eliminar la tarea');
                }
              } catch (error) {
                console.error('Error en onPress de eliminar:', error);
                Alert.alert('Error', 'No se pudo eliminar la tarea');
              }
            }
          }
        ]
      );
    } catch (error) {
      console.error('Error en eliminarTarea:', error);
      Alert.alert('Error', 'No se pudo eliminar la tarea');
    }
  };

  // Cargar tareas al montar el componente
  useEffect(() => {
    cargarTareas();
  }, []);

  // Función para cambiar entre tabs
  const cambiarTab = (nuevoTab) => {
    setTabActivo(nuevoTab);
  };
  
  // Mostrar tareas según el tab activo
  let tareasFiltradas = [];
  if (tabActivo === 'Realizadas') {
    tareasFiltradas = tareas.filter(t => t.estado === 'Completado');
  } else {
    tareasFiltradas = tareas.filter(t => t.estado === 'Pendiente');
  }

  // Función para mostrar detalle de tarea
  const mostrarDetalleTarea = (tarea) => {
    setTareaSeleccionada(tarea);
    setModalVisible(true);
    setModoEdicion(false);
    // Resetear estados de edición
    setEstadoEditado('');
    setPrioridadEditada('');
    setFechaEditada('');
  };

  // Entrar en modo edición
  const entrarModoEdicion = () => {
    setModoEdicion(true);
    // Establecer valores iniciales de edición
    setEstadoEditado(tareaSeleccionada.estado);
    setPrioridadEditada(tareaSeleccionada.prioridad || TipoPrioridad[0]);
    setFechaEditada(tareaSeleccionada.fecha || new Date().toISOString());
  };

  // Función para cambiar el estado de la tarea desde la lista
  const cambiarEstadoTarea = async (tarea) => {
    try {
      const nuevoEstado = tarea.estado === 'Pendiente' ? 'Completado' : 'Pendiente';
      const idUsuario = await AsyncStorage.getItem('UserID');
      
      console.log('Cambiando estado de tarea:', tarea.id);
      console.log('Nuevo estado:', nuevoEstado);
      
      const datosActualizacion = {
        usuario: idUsuario, // Cambiado de usuarioId a usuario
        Estado: nuevoEstado
      };
      
      console.log('Datos para cambiar estado:', datosActualizacion);
      
      const resultado = await updateData(
        `http://192.168.100.57:3000/api/pendientes/update/${tarea.id}`, 
        datosActualizacion
      );

      console.log('Respuesta de cambio de estado:', resultado);

      if (!resultado.error) {
        console.log('Estado cambiado exitosamente, recargando tareas...');
        await cargarTareas();
      } else {
        console.error('Error al cambiar estado:', resultado.message);
        Alert.alert('Error', resultado.message || 'No se pudo cambiar el estado de la tarea');
      }
    } catch (error) {
      console.error('Error al cambiar estado:', error);
      Alert.alert('Error', 'No se pudo cambiar el estado de la tarea');
    }
  };

  // Función para manejar el cambio de fecha
  const manejarCambioFecha = (event, selectedDate) => {
    setMostrarDatePicker(false);
    if (selectedDate) {
      console.log('Nueva fecha seleccionada:', selectedDate);
      setFechaEditada(selectedDate.toISOString());
    }
  };

  return (
    <SafeAreaView style={estilos.contenedor}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      
      {/* Cabecera */}
      <View style={estilos.cabecera}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={estilos.botonVolver}>
          <Feather name="chevron-left" size={24} color="#000" />
          <Text style={estilos.textoVolver}>Volver</Text>
        </TouchableOpacity>
        <Text style={estilos.tituloCabecera}>Tareas</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AgregarTarea')}>
          <Text style={estilos.textoAgregar}>Agregar una Tarea</Text>
        </TouchableOpacity>
      </View>
      
      {/* Título */}
      <View style={estilos.contenedorTitulo}>
        <Text style={estilos.tituloPagina}>Lista de Tareas</Text>
      </View>
      
      {/* Lista de Tareas con ScrollView */}
      <ScrollView style={estilos.scrollView} contentContainerStyle={estilos.scrollContainer}>
        {cargando ? (
          <View style={estilos.contenedorCargando}>
            <ActivityIndicator size="large" color="#FFC107" />
            <Text style={estilos.textoCargando}>Cargando tareas...</Text>
          </View>
        ) : tareasFiltradas.length > 0 ? (
          tareasFiltradas.map(tarea => (
            <TouchableOpacity 
              key={tarea.id} 
              style={estilos.itemTarea}
              onPress={() => mostrarDetalleTarea(tarea)}
            >
              <View style={estilos.contenidoTarea}>
                <Text style={estilos.tituloTarea}>{tarea.titulo}</Text>
                {tarea.descripcion ? (
                  <Text style={estilos.descripcionTarea} numberOfLines={1}>
                    {tarea.descripcion}
                  </Text>
                ) : null}
              </View>
              <TouchableOpacity 
                style={[
                  estilos.botonCheck,
                  tarea.estado === 'Completado' && estilos.checkCompletado
                ]}
                onPress={() => cambiarEstadoTarea(tarea)}
              >
                <Feather name="check" size={22} color={tarea.estado === 'Completado' ? "#fff" : "#000"} />
              </TouchableOpacity>
            </TouchableOpacity>
          ))
        ) : (
          <View style={estilos.contenedorVacio}>
            <Text style={estilos.textoVacio}>
              No hay tareas {tabActivo === 'Realizadas' ? 'realizadas' : 'pendientes'}
            </Text>
          </View>
        )}
        {/* Espacio adicional al final para que no se oculte contenido detrás de las tabs */}
        <View style={estilos.espacioFinal} />
      </ScrollView>
      
      {/* Tabs fijos en la parte inferior */}
      <View style={estilos.contenedorTabs}>
        <TouchableOpacity 
          style={[
            estilos.botonTab, 
            tabActivo === 'Realizadas' && estilos.tabActivo
          ]}
          onPress={() => cambiarTab('Realizadas')}
        >
          <Text style={estilos.textoTab}>Realizadas</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            estilos.botonTab, 
            tabActivo === 'Pendientes' && estilos.tabActivo
          ]}
          onPress={() => cambiarTab('Pendientes')}
        >
          <Text style={estilos.textoTab}>Pendientes</Text>
        </TouchableOpacity>
      </View>

      {/* Modal de Detalle */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={estilos.centeredView}>
          <View style={estilos.modalView}>
            {tareaSeleccionada && (
              <>
                <View style={estilos.modalHeader}>
                  <Text style={estilos.modalTitulo}>
                    {modoEdicion ? 'Editar Tarea' : 'Detalles de la Tarea'}
                  </Text>
                  <View style={{ flexDirection: 'row' }}>
                    {!modoEdicion ? (
                      <>
                        <TouchableOpacity 
                          onPress={entrarModoEdicion} 
                          style={{ marginRight: 15 }}
                        >
                          <Feather name="edit" size={24} color="#007BFF" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={eliminarTarea}>
                          <Feather name="trash-2" size={24} color="#FF0000" />
                        </TouchableOpacity>
                      </>
                    ) : (
                      <TouchableOpacity onPress={() => setModoEdicion(false)}>
                        <Feather name="x" size={24} color="#000" />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
                
                <View style={estilos.modalContenido}>
                  {/* Título siempre visible */}
                  <View style={estilos.campoDetalle}>
                    <Text style={estilos.labelDetalle}>Título:</Text>
                    <Text style={estilos.valorDetalle}>{tareaSeleccionada.titulo}</Text>
                  </View>
                  
                  {/* Descripción siempre visible */}
                  <View style={estilos.campoDetalle}>
                    <Text style={estilos.labelDetalle}>Descripción:</Text>
                    <Text style={estilos.valorDetalle}>
                      {tareaSeleccionada.descripcion || 'Sin descripción'}
                    </Text>
                  </View>
                  
                  {/* Estado - editable en modo edición */}
                  <View style={estilos.campoDetalle}>
                    <Text style={estilos.labelDetalle}>Estado:</Text>
                    {modoEdicion ? (
                      <View style={estilos.pickerContainer}>
                        <Picker
                          selectedValue={estadoEditado}
                          onValueChange={(itemValue) => setEstadoEditado(itemValue)}
                        >
                          {TipoEstado.map((estado) => (
                            <Picker.Item key={estado} label={estado} value={estado} />
                          ))}
                        </Picker>
                      </View>
                    ) : (
                      <Text style={[
                        estilos.valorDetalle, 
                        estilos.estadoTarea,
                        tareaSeleccionada.estado === 'Completado' ? estilos.estadoCompletado : estilos.estadoPendiente
                      ]}>
                        {tareaSeleccionada.estado}
                      </Text>
                    )}
                  </View>
                  
                  {/* Prioridad - editable en modo edición */}
                  <View style={estilos.campoDetalle}>
                    <Text style={estilos.labelDetalle}>Prioridad:</Text>
                    {modoEdicion ? (
                      <View style={estilos.pickerContainer}>
                        <Picker
                          selectedValue={prioridadEditada}
                          onValueChange={(itemValue) => setPrioridadEditada(itemValue)}
                        >
                          {TipoPrioridad.map((prioridad) => (
                            <Picker.Item key={prioridad} label={prioridad} value={prioridad} />
                          ))}
                        </Picker>
                      </View>
                    ) : (
                      <Text style={estilos.valorDetalle}>
                        {tareaSeleccionada.prioridad || 'Sin prioridad'}
                      </Text>
                    )}
                  </View>
                  
                  {/* Fecha - editable en modo edición */}
                  <View style={estilos.campoDetalle}>
                    <Text style={estilos.labelDetalle}>Fecha:</Text>
                    {modoEdicion ? (
                      <>
                        <TouchableOpacity 
                          style={estilos.inputFecha}
                          onPress={() => setMostrarDatePicker(true)}
                        >
                          <Text>
                            {fechaEditada ? new Date(fechaEditada).toLocaleDateString() : 'Seleccionar fecha'}
                          </Text>
                        </TouchableOpacity>
                        
                        {mostrarDatePicker && (
                          <DateTimePicker
                            value={fechaEditada ? new Date(fechaEditada) : new Date()}
                            mode="date"
                            display="default"
                            onChange={manejarCambioFecha}
                          />
                        )}
                      </>
                    ) : (
                      <Text style={estilos.valorDetalle}>
                        {tareaSeleccionada.fecha ? new Date(tareaSeleccionada.fecha).toLocaleDateString() : 'Sin fecha'}
                      </Text>
                    )}
                  </View>
                </View>
                
                {/* Botones según el modo */}
                {modoEdicion ? (
                  <View style={estilos.contenedorBotonesModal}>
                    <TouchableOpacity 
                      style={[estilos.botonAccion, estilos.botonCancelar]}
                      onPress={() => setModoEdicion(false)}
                    >
                      <Text style={estilos.textoBotonCancelar}>Cancelar</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      style={[estilos.botonAccion, estilos.botonGuardar]}
                      onPress={actualizarTarea}
                    >
                      <Text style={estilos.textoBotonGuardar}>Guardar</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity 
                    style={estilos.botonCerrarModal}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={estilos.textoBotonCerrar}>Cerrar</Text>
                  </TouchableOpacity>
                )}
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contenedorPrincipal: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  contenedorLista: {
    flex: 1,
  },
  cabecera: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  botonVolver: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textoVolver: {
    fontSize: 16,
  },
  tituloCabecera: {
    fontSize: 16,
    fontWeight: '500',
  },
  textoAgregar: {
    fontSize: 14,
    color: '#007BFF',
  },
  contenedorTitulo: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tituloPagina: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 60, // Espacio para que no se oculte contenido bajo los tabs
  },
  itemTarea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  contenidoTarea: {
    flex: 1,
    marginRight: 10,
  },
  tituloTarea: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  descripcionTarea: {
    fontSize: 14,
    color: '#666',
  },
  botonCheck: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkCompletado: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  contenedorTabs: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    height: 50,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
  },
  botonTab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  tabActivo: {
    backgroundColor: '#FFC107',
  },
  textoTab: {
    fontSize: 16,
    fontWeight: '500',
  },
  contenedorCargando: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  textoCargando: {
    marginTop: 10,
    fontSize: 16,
  },
  contenedorVacio: {
    padding: 20,
    alignItems: 'center',
    paddingBottom: 60, // Para que el contenido no quede detrás de los tabs
  },
  textoVacio: {
    fontSize: 16,
    color: '#666',
  },
  espacioFinal: {
    height: 60, // Espacio adicional al final del ScrollView
  },
  // Estilos del Modal
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 10,
  },
  modalTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContenido: {
    marginBottom: 20,
  },
  campoDetalle: {
    marginBottom: 15,
  },
  labelDetalle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  valorDetalle: {
    fontSize: 16,
  },
  estadoTarea: {
    fontWeight: 'bold',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  estadoCompletado: {
    backgroundColor: '#E8F5E9',
    color: '#2E7D32',
  },
  estadoPendiente: {
    backgroundColor: '#FFF3E0',
    color: '#E65100',
  },
  botonCerrarModal: {
    backgroundColor: '#007BFF',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  textoBotonCerrar: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  // Estilos para edición en modal
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 5,
    marginTop: 5,
  },
  inputFecha: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
  },
  contenedorBotonesModal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  botonAccion: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  botonCancelar: {
    backgroundColor: '#e0e0e0',
  },
  botonGuardar: {
    backgroundColor: '#007BFF',
  },
  textoBotonCancelar: {
    color: '#000',
    fontWeight: 'bold',
  },
  textoBotonGuardar: {
    color: '#fff',
    fontWeight: 'bold',
  }
});

export default ListaDeTareas;