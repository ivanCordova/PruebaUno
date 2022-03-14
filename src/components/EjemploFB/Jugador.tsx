import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import firestore from '@react-native-firebase/firestore';

const Jugador = (props: IJugadores) => {
  const createTwoButtonAlert = () => {
    Alert.alert(
        "Alert Title",
        "My Alert Msg",
        [
          {
            text: "Cancel",
            onPress: () => console.log(`${props.id}`),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
}

  return (
    <View style={styles.container}>
      <Pressable onPress={createTwoButtonAlert}>
        <Text style={styles.texto}>{`Nombre: ${props.Nombre}`}</Text>
        <Text style={styles.texto}>{`Edad: ${props.Edad}`}</Text>
        <Text style={styles.texto}>{`Pais: ${props.Pais}`}</Text>
      </Pressable>
    </View>
  )
}

interface IJugadores {
  Nombre: string,
  Edad: number,
  Pais: string,
  id: string
}


export default Jugador

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    borderColor: "white",
    borderWidth: 2,
    padding: 20,
    width: "48%",
    height: 150,
    justifyContent: "center",
    backgroundColor: "green",
    margin: 2
  },
  texto: {
    fontSize: 20,
    color: "white"
  }
})