import React, { useState } from 'react';
import { Text, View, Button, StyleSheet, TextInput } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const [name, setName] = useState(''); 

  return (
    <View style={styles.container}>
      <Text> Bienvenido a Tu Asistente Personal</Text>
      <Text>Dame un Nombre a tu Gusto</Text>

      <TextInput
        style={styles.input} 
        onChangeText={setName} 
        value={name}
      />
      <Text>Perfecto! Mi Nombre será: {name} </Text>

      <Button
        title="Comenzar..."
        onPress={() => navigation.navigate('IniciarSesion')}
      />
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
});

export default HomeScreen;
