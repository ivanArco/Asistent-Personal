import React, { useState, useEffect } from 'react';
import { 
    Text, 
    View, 
    StyleSheet, 
    TouchableOpacity, 
    FlatList, 
    Alert,
    SafeAreaView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const HistorialScreen = ({ navigation }) => {
    const [consultas, setConsultas] = useState([]);

    // Cargar historial de consultas al iniciar
    useEffect(() => {
        cargarHistorial();
    }, []);

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

    // Limpiar historial
    const limpiarHistorial = async () => {
        try {
            await AsyncStorage.removeItem('historialConsultas');
            setConsultas([]);
            Alert.alert('Historial Borrado', 'Se ha eliminado todo el historial de consultas.');
        } catch (error) {
            console.error('Error al limpiar historial:', error);
        }
    };

    // Renderizar cada elemento del historial
    const renderConsulta = ({ item, index }) => (
        <View style={styles.consultaItem}>
            <View style={styles.consultaContenido}>
                <Text style={styles.consultaNumero}>#{index + 1}</Text>
                <Text style={styles.consultaTexto} numberOfLines={2}>
                    {item}
                </Text>
            </View>
            <TouchableOpacity 
                style={styles.searchButton}
                onPress={() => {
                    // Navegar a la pantalla de búsqueda con el texto de la consulta
                    navigation.navigate('Busquedas', { consulta: item });
                }}
            >
                <Ionicons name="search" size={20} color="black" />
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity 
                    onPress={() => navigation.goBack()} 
                    style={styles.backButton}
                >
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>Consultas Hechas</Text>
                {consultas.length > 0 && (
                    <TouchableOpacity onPress={limpiarHistorial} style={styles.botonLimpiar}>
                        <Text style={styles.textoBotonLimpiar}>Limpiar</Text>
                    </TouchableOpacity>
                )}
            </View>

            {consultas.length === 0 ? (
                <View style={styles.mensajeSinConsultas}>
                    <Ionicons name="document-text-outline" size={80} color="#E0E0E0" />
                    <Text style={styles.textoSinConsultas}>
                        No hay consultas recientes
                    </Text>
                    <Text style={styles.textoSinConsultasDetalle}>
                        Tus consultas aparecerán aquí cuando las realices
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={consultas}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderConsulta}
                    contentContainerStyle={styles.listaConsultas}
                    showsVerticalScrollIndicator={false}
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
                    <Ionicons name="search" size={24} color="black" />
                    <Text style={styles.iconLabel}>Preguntar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Perfil')} style={styles.iconContainer}>
                    <Ionicons name="person" size={24} color="black" />
                    <Text style={styles.iconLabel}>Perfil</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: 'white',
  },
  headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 15,
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#F1F1F1',
  },
  backButton: {
      marginRight: 10,
  },
  title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'black',
      flex: 1,
      textAlign: 'center',
  },
  botonLimpiar: {
      backgroundColor: '#FFC107',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
  },
  textoBotonLimpiar: {
      color: 'black',
      fontWeight: 'bold',
  },
  consultaItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 15,
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#F1F1F1',
  },
  consultaContenido: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
  },
  consultaNumero: {
      fontSize: 16,
      color: 'black',
      marginRight: 10,
  },
  consultaTexto: {
      flex: 1,
      fontSize: 16,
      color: 'black',
  },
  searchButton: {
      backgroundColor: '#FFC107',
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 10,
  },
  listaConsultas: {
      paddingBottom: 80,
  },
  mensajeSinConsultas: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 30,
  },
  textoSinConsultas: {
      fontSize: 16,
      color: '#888',
      marginTop: 15,
      textAlign: 'center',
  },
  textoSinConsultasDetalle: {
      fontSize: 14,
      color: '#888',
      textAlign: 'center',
      marginTop: 5,
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
      borderTopWidth: 1,
      borderTopColor: 'rgba(0,0,0,0.1)',
  },
  iconContainer: {
      alignItems: 'center',
      justifyContent: 'center',
  },
  iconLabel: {
      fontSize: 12,
      color: 'black',
      marginTop: 5,
  },
});

export default HistorialScreen;