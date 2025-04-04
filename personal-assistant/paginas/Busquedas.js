import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    ScrollView,
    ActivityIndicator,
    StatusBar
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';

import { apiCall, imageGenerationCall } from '../APi/OpenAI';

const SearchScreen = ({ navigation, route }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [consultas, setConsultas] = useState([]);
    const [respuestaAI, setRespuestaAI] = useState('');
    const [cargando, setCargando] = useState(false);
    const [tipoConsulta, setTipoConsulta] = useState('texto');

    // Cargar historial al inicio y verificar si hay una consulta pasada
    useEffect(() => {
        cargarHistorial();
        hacerConsultaInicial();

        // Verificar si hay una consulta pasada desde el historial
        if (route.params?.consulta) {
            setSearchTerm(route.params.consulta);
        }
    }, [route.params?.consulta]);

    // Cargar historial desde AsyncStorage
    const cargarHistorial = async () => {
        try {
            const historialGuardado = await AsyncStorage.getItem('historialConsultas');
            if (historialGuardado) {
                setConsultas(JSON.parse(historialGuardado));
            }
        } catch (error) {
            console.error('Error al cargar historial:', error);
        }
    };

    // Guardar historial en AsyncStorage
    const guardarHistorial = async (nuevoHistorial) => {
        try {
            await AsyncStorage.setItem('historialConsultas', JSON.stringify(nuevoHistorial));
        } catch (error) {
            console.error('Error al guardar historial:', error);
        }
    };

    // Consulta inicial al cargar la pantalla
    const hacerConsultaInicial = async () => {
        try {
            setCargando(true);
            const respuesta = await apiCall("Dame una introducción breve sobre inteligencia artificial");
            if (respuesta.success) {
                setRespuestaAI(respuesta.data);
            } else {
                setRespuestaAI("Error al obtener respuesta");
            }
        } catch (error) {
            console.error("Error al consultar a Gemini:", error);
            setRespuestaAI("Error de conexión");
        } finally {
            setCargando(false);
        }
    };

    // Manejar la búsqueda
    const handleSearch = async () => {
        if (!searchTerm.trim()) return;

        try {
            setCargando(true);
            let respuesta;
           
            // Determinar el tipo de consulta
            if (tipoConsulta === 'texto') {
                respuesta = await apiCall(searchTerm);
            } else {
                respuesta = await imageGenerationCall(searchTerm);
            }

            if (respuesta.success) {
                setRespuestaAI(respuesta.data);
               
                // Guardar consulta en historial
                const nuevoHistorial = [searchTerm, ...consultas].slice(0, 10);
                setConsultas(nuevoHistorial);
                guardarHistorial(nuevoHistorial);
            } else {
                setRespuestaAI("Error al obtener respuesta");
            }
        } catch (error) {
            console.error("Error en la búsqueda:", error);
            setRespuestaAI("Error de conexión");
        } finally {
            setCargando(false);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            
            {/* Encabezado de retorno */}
            <TouchableOpacity 
                style={styles.backButton} 
                onPress={() => navigation.goBack()}
            >
                <Ionicons name="chevron-back" size={24} color="black" />
            </TouchableOpacity>

            {/* Título de la pantalla */}
            <Text style={styles.screenTitle}>Buscar</Text>

            {/* Selección de tipo de consulta */}
            <View style={styles.consultTypeContainer}>
                <TouchableOpacity 
                    style={[
                        styles.consultTypeIcon, 
                        tipoConsulta === 'texto' && styles.activeConsultType
                    ]}
                    onPress={() => setTipoConsulta('texto')}
                >
                    <Ionicons 
                        name="document-text-outline" 
                        size={40} 
                        color={tipoConsulta === 'texto' ? 'black' : '#888'} 
                    />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[
                        styles.consultTypeIcon, 
                        tipoConsulta === 'imagen' && styles.activeConsultType
                    ]}
                    onPress={() => setTipoConsulta('imagen')}
                >
                    <Ionicons 
                        name="image-outline" 
                        size={40} 
                        color={tipoConsulta === 'imagen' ? 'black' : '#888'} 
                    />
                </TouchableOpacity>
            </View>

            {/* Texto de instrucción */}
            <Text style={styles.instructionText}>
                {tipoConsulta === 'texto' 
                    ? '¿Qué Quieres Buscar?' 
                    : '¿Qué Quieres Generar?'}
            </Text>

            {/* Contenedor de búsqueda */}
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Título de la Tarea"
                    placeholderTextColor="#888"
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                />
                <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                    <Ionicons name="search" size={24} color="black" />
                </TouchableOpacity>
            </View>

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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    backButton: {
        position: 'absolute',
        top: 15,
        left: 15,
        zIndex: 10,
    },
    screenTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 15,
        color: 'black',
    },
    consultTypeContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30,
        marginBottom: 20,
    },
    consultTypeIcon: {
        marginHorizontal: 20,
        padding: 10,
        borderRadius: 10,
    },
    activeConsultType: {
        backgroundColor: '#FFC107',
    },
    instructionText: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
        color: 'black',
    },
    searchContainer: {
        flexDirection: 'row',
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        alignItems: 'center',
    },
    searchInput: {
        flex: 1,
        padding: 10,
        fontSize: 16,
        color: 'black',
    },
    searchButton: {
        padding: 10,
        backgroundColor: '#FFC107',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    bottomNav: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
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
});

export default SearchScreen;