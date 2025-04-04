import React, { useState, useEffect } from 'react';
import { 
    Text, 
    View, 
    StyleSheet, 
    TouchableOpacity, 
    Alert,
    SafeAreaView,
    StatusBar,
    Modal,
    TextInput,
    ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

const PerfilScreen = ({ navigation }) => {
    const [usuario, setUsuario] = useState({
        id: null,
        nombre: '',
        email: '',
        imagen: null
    });
    const [modalVisible, setModalVisible] = useState(false);
    const [editNombre, setEditNombre] = useState('');
    const [editEmail, setEditEmail] = useState('');
    const [editPassword, setEditPassword] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');

    // Cargar datos del usuario al iniciar
    useEffect(() => {
        cargarDatosUsuario();
    }, []);

    // Cargar datos del usuario desde AsyncStorage y la API
    const cargarDatosUsuario = async () => {
        try {
            // Obtener ID de usuario almacenado
            const userId = await AsyncStorage.getItem('userId');
            
            if (userId) {
                // Llamar a la API para obtener detalles del usuario
                const response = await axios.get(`http://192.168.100.57:3000/api/users/byId/${userId}`);
                
                if (response.data) {
                    setUsuario({
                        id: userId,
                        nombre: response.data.nombre || 'Usuario',
                        email: response.data.email || 'usuario@ejemplo.com',
                        imagen: response.data.imagen
                    });
                }
            }
        } catch (error) {
            console.error('Error al cargar datos de usuario:', error);
            Alert.alert('Error', 'No se pudieron cargar los datos de usuario');
        }
    };

    // Función para cerrar sesión
    const cerrarSesion = async () => {
        Alert.alert(
            'Cerrar Sesión',
            '¿Estás seguro de que quieres cerrar sesión?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Cerrar Sesión', 
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            // Eliminar tokens y datos de usuario
                            await AsyncStorage.removeItem('userToken');
                            await AsyncStorage.removeItem('userId');
                            await AsyncStorage.removeItem('userData');
                            
                            // Limpiar historial de consultas
                            await AsyncStorage.removeItem('historialConsultas');
                            
                            // Navegar a la pantalla de inicio de sesión
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'Login' }]
                            });
                        } catch (error) {
                            console.error('Error al cerrar sesión:', error);
                            Alert.alert('Error', 'No se pudo cerrar sesión');
                        }
                    }
                }
            ]
        );
    };

    // Función para actualizar perfil
    const actualizarPerfil = async () => {
        // Validaciones básicas
        if (!editNombre.trim()) {
            Alert.alert('Error', 'El nombre no puede estar vacío');
            return;
        }

        try {
            // Preparar datos para actualización
            const datosActualizacion = {
                nombre: editNombre,
                email: editEmail
            };

            // Si se proporciona contraseña, incluirla
            if (editPassword.trim()) {
                // Validar contraseña actual
                if (!currentPassword.trim()) {
                    Alert.alert('Error', 'Debe ingresar la contraseña actual');
                    return;
                }
                datosActualizacion.password = editPassword;
                datosActualizacion.currentPassword = currentPassword;
            }

            // Llamar a la API para actualizar
            const response = await axios.put(
                `http://192.168.100.57:3000/api/users/update/${usuario.id}`, 
                datosActualizacion
            );

            // Actualizar datos locales
            setUsuario(prev => ({
                ...prev,
                nombre: editNombre,
                email: editEmail
            }));

            // Cerrar modal y mostrar confirmación
            setModalVisible(false);
            Alert.alert('Éxito', 'Perfil actualizado correctamente');
        } catch (error) {
            console.error('Error al actualizar perfil:', error);
            Alert.alert('Error', error.response?.data?.message || 'No se pudo actualizar el perfil');
        }
    };

    // Modal de edición de perfil
    const ModalEditarPerfil = () => (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.modalContainer}>
                <ScrollView 
                    style={styles.modalContent}
                    keyboardShouldPersistTaps="handled"
                >
                    <Text style={styles.modalTitle}>Editar Perfil</Text>
                    
                    <Text style={styles.labelInput}>Nombre</Text>
                    <TextInput
                        style={styles.input}
                        value={editNombre}
                        onChangeText={setEditNombre}
                        placeholder="Nuevo nombre"
                    />

                    <Text style={styles.labelInput}>Correo Electrónico</Text>
                    <TextInput
                        style={styles.input}
                        value={editEmail}
                        onChangeText={setEditEmail}
                        placeholder="Nuevo correo"
                        keyboardType="email-address"
                    />

                    <Text style={styles.labelInput}>Contraseña Actual</Text>
                    <TextInput
                        style={styles.input}
                        value={currentPassword}
                        onChangeText={setCurrentPassword}
                        placeholder="Contraseña actual"
                        secureTextEntry
                    />

                    <Text style={styles.labelInput}>Nueva Contraseña (opcional)</Text>
                    <TextInput
                        style={styles.input}
                        value={editPassword}
                        onChangeText={setEditPassword}
                        placeholder="Nueva contraseña"
                        secureTextEntry
                    />

                    <View style={styles.modalButtonContainer}>
                        <TouchableOpacity 
                            style={styles.modalButtonCancelar}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.modalButtonTexto}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.modalButtonGuardar}
                            onPress={actualizarPerfil}
                        >
                            <Text style={styles.modalButtonTexto}>Guardar</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </Modal>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            
            <Text style={styles.welcomeText}>Perfil</Text>

            {/* Imagen de perfil */}
            <View style={styles.profileImageContainer}>
                <Ionicons name="person-circle" size={120} color="#FFC107" />
            </View>

            {/* Información del usuario */}
            <View style={styles.userInfoContainer}>
                <Text style={styles.nombreUsuario}>{usuario.nombre}</Text>
                <Text style={styles.emailUsuario}>{usuario.email}</Text>
            </View>

            {/* Contenedor de opciones */}
            <View style={styles.opcionesContainer}>
                <TouchableOpacity 
                    style={styles.opcionItem}
                    onPress={() => {
                        // Preparar datos para edición
                        setEditNombre(usuario.nombre);
                        setEditEmail(usuario.email);
                        setEditPassword('');
                        setCurrentPassword('');
                        setModalVisible(true);
                    }}
                >
                    <Ionicons name="create-outline" size={24} color="black" />
                    <Text style={styles.opcionTexto}>Editar Perfil</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.opcionItem}
                    onPress={() => navigation.navigate('Home')}
                >
                    <Ionicons name="information-circle-outline" size={24} color="black" />
                    <Text style={styles.opcionTexto}>Acerca de</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.opcionItem}
                    onPress={cerrarSesion}
                >
                    <Ionicons name="log-out-outline" size={24} color="red" />
                    <Text style={[styles.opcionTexto, styles.cerrarSesionTexto]}>Cerrar Sesión</Text>
                </TouchableOpacity>
            </View>

            {/* Modal de edición */}
            <ModalEditarPerfil />

            {/* Menú de navegación inferior */}
            <View style={styles.bottomNav}>
                <TouchableOpacity onPress={() => navigation.navigate('Inicio')} style={styles.navItem}>
                    <Ionicons name="home" size={24} color="black" />
                    <Text style={styles.navLabel}>Inicio</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Historial')} style={styles.navItem}>
                    <Ionicons name="list" size={24} color="black" />
                    <Text style={styles.navLabel}>Consultas</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Busquedas')} style={styles.navItem}>
                    <Ionicons name="search" size={24} color="black" />
                    <Text style={styles.navLabel}>Preguntar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Perfil')} style={styles.navItem}>
                    <Ionicons name="person" size={24} color="black" />
                    <Text style={styles.navLabel}>Perfil</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    welcomeText: {
        fontSize: 22,
        fontWeight: 'bold',
        marginVertical: 20,
    },
    profileImageContainer: {
        marginBottom: 20,
        alignItems: 'center',
    },
    userInfoContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    nombreUsuario: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    emailUsuario: {
        fontSize: 16,
        color: '#666',
        marginTop: 5,
    },
    opcionesContainer: {
        width: '90%',
        backgroundColor: '#f4f4f4',
        borderRadius: 10,
        padding: 15,
    },
    opcionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    opcionTexto: {
        marginLeft: 15,
        fontSize: 16,
        color: 'black',
    },
    cerrarSesionTexto: {
        color: 'red',
    },
    bottomNav: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#FFC107',
        paddingVertical: 10,
    },
    navItem: {
        alignItems: 'center',
    },
    navLabel: {
        fontSize: 12,
        color: 'black',
        marginTop: 5,
    },
    // Estilos para el modal
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        maxHeight: '80%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        borderRadius: 5,
        marginBottom: 15,
    },
    labelInput: {
        marginBottom: 5,
        fontWeight: '600',
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    modalButtonCancelar: {
        flex: 1,
        backgroundColor: '#ddd',
        padding: 15,
        borderRadius: 5,
        marginRight: 10,
        alignItems: 'center',
    },
    modalButtonGuardar: {
        flex: 1,
        backgroundColor: '#FFC107',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    modalButtonTexto: {
        fontWeight: 'bold',
        color: 'black',
    },
});

export default PerfilScreen;