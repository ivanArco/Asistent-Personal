import React, { useState } from 'react';
import { Text, View, Button, TextInput, StyleSheet, Alert, TouchableOpacity, FlatList } from 'react-native';

import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import LottieView from 'lottie-react-native';

const SearchScreen = ({ navigation }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [consultas, setConsultas] = useState([]); // Aquí se guardan las búsquedas

    const handleSearch = (term) => {
        setSearchTerm(term);
        // Aquí podrías filtrar datos o hacer una búsqueda real
        const results = []; // Pueden ser los resultados de una base de datos o array
        setSearchResults(results);

        // Guardar la búsqueda en el historial de consultas
        if (term) {
            setConsultas([...consultas, term]);
        }

    };

    const handleSearchClick = () => {
        // Lógica a ejecutar al presionar el ícono
        console.log('Realizando la búsqueda con el término:', searchTerm);
        // Aquí puedes hacer lo que necesites, como buscar en una API o filtrar resultados
    };



    return (
        <View style={styles.container}>


            <View style={styles.iconmedium}>
                <Ionicons name="search-sharp" size={50} color="black" />
            </View>

            <View style={styles.iconContainer}>
                <FontAwesome name="file-photo-o" size={50} color="black" />

                <Ionicons name="bulb-sharp" size={50} color="black" />
            </View>

            <Text style={styles.welcomeText}>¿Que Quieres Buscar?</Text>


            <View style={styles.inputContainer}>

                <TextInput
                    style={styles.input}
                    onChangeText={setSearchTerm}
                    value={searchTerm}
                    placeholder="Buscar..."
                />

                <TouchableOpacity onPress={handleSearchClick} style={styles.icon}>
                    <Ionicons name="search-sharp" size={20} color="black" />
                </TouchableOpacity>
            </View>

          
            <FlatList
                data={searchResults}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item}</Text>
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
        marginTop: 20,
    },
    welcomeText: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
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
    iconContainer: {
        flexDirection: 'row', // Alinea los íconos horizontalmente
        justifyContent: 'space-between', // Distribuye los íconos con espacio entre ellos
        paddingTop: 20, // Agrega un espacio arriba de los íconos
        paddingHorizontal: 10, // Agrega un espacio horizontal
    },

    iconmedium: {


        paddingTop: 40, // Agrega un espacio arriba de los íconos

    },
    icon: {
        marginHorizontal: 50, // Espacio entre los íconos
        marginRight: 10, // Espacio entre el ícono y el campo de texto
        
    },
    inputContainer: {
        flexDirection: 'row', // Alinea el ícono y el campo de texto horizontalmente
        alignItems: 'center', // Centra verticalmente los elementos
        borderWidth: 5, // Borde del input
        borderColor: '#ccc', // Color del borde
        borderRadius: 8, // Bordes redondeados
        paddingHorizontal: 20, // Espacio alrededor del input
        paddingVertical: 5, // Espacio vertical
    },
    input: {
        flex: 1, // Hace que el campo de texto ocupe el resto del espacio
        height: 40, // Altura del campo de texto
        fontSize: 16, // Tamaño del texto
    },



});

export default SearchScreen;

