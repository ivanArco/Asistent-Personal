import React, { useState } from 'react';
import { Text, View, Button, TextInput, StyleSheet, Alert, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
  
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={handleSearch}
          value={searchTerm}
          placeholder="Buscar..."
        />
        
        <FlatList
          data={searchResults}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View>
              <Text>{item}</Text>
            </View>
          )}
        />
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      justifyContent: 'center',
    },
    input: {
      height: 40,
      borderColor: '#ddd',
      borderWidth: 1,
      marginBottom: 16,
      paddingLeft: 8,
    },
    bottomNav: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      position: 'absolute',
      bottom: 0,
      width: '100%',
      backgroundColor: '#fff',
      padding: 10,
    },
  });
  
  export default SearchScreen;
  