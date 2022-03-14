import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, Pressable, Alert, Text, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Jugador from './Jugador';
import Icon from 'react-native-vector-icons/FontAwesome';
import ItemProducto from '../Productos/ItemProductos';


const AgregarJugador = () => {
    const [nombre, setNombre] = useState<string>("")
    const [edad, setEdad] = useState<string>("")
    const [nacion, setNacion] = useState<string>("")
    const [jugadoresArray, setJugadoresArray] = useState<IJugadores[]>([])

    interface IJugadores{
        Nombre: string,
        Edad: number,
        Pais: string,
        id: string
    }



    useEffect(() =>{
        //GetJugadores();
        const subscriber = firestore()
          .collection('Jugadores')
          .onSnapshot(documentSnapshot => {
            const data = documentSnapshot.docs.map((item)=>
              item.data() as IJugadores
            )
            setJugadoresArray(data);
          });
        // Stop listening for updates when no longer required
        return () => subscriber();
    }, [])

    const agregar = (() => {
        if (nombre != "" && edad != "" && nacion != "") {
            firestore()
                .collection('Jugadores')
                .add({
                    Nombre: nombre,
                    Pais: nacion,
                    Edad: parseInt(edad)
                })
                .then(() => {
                    setNombre("")
                    setEdad("")
                    setNacion("")
                });
        } else {
            Alert.alert("Error", "Llene todos los campos")
        }

    })

    return (
        <View style={{ flex: 1 }}>
            <View style={estilos.containerInput}>
                <Icon style={{marginVertical: 10}} name="futbol-o" size={80} color="green" />
                <TextInput style={estilos.textInput} placeholder="Nombre" onChangeText={(texto) => setNombre(texto)} value={nombre}></TextInput>
                <TextInput keyboardType="numeric" style={estilos.textInput} placeholder="Edad" onChangeText={(texto) => setEdad(texto)} value={`${edad}`}></TextInput>
                <TextInput style={estilos.textInput} placeholder="Nacionalidad" onChangeText={(texto) => setNacion(texto)} value={nacion}></TextInput>
                <Pressable style={estilos.estiloBoton} onPress={agregar}>
                    <Text style={estilos.botonAgregar}>Agregar</Text>
                </Pressable>
            </View>
            <View style={estilos.containerJugador}>
                <ScrollView contentContainerStyle={estilos.scroll}>
                    {jugadoresArray.map((e, i) =>
                        <Jugador key={i} Nombre={e.Nombre} Edad={e.Edad} Pais={e.Pais} id={e.id}></Jugador>
                    )}
                </ScrollView>
            </View>
        </View>
    );
};

const estilos = StyleSheet.create({
    scroll:{
        flexDirection: "row",
        flexWrap: "wrap",
        margin: 5,
        padding: 5
    },
    containerInput: {
        flex: 3,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "green",
        borderWidth: 2,
        borderRadius: 10,
        marginHorizontal: 5,
        marginVertical: 5
    },
    containerJugador: {
        flex: 2,
        borderColor: "green",
        borderWidth: 2,
        borderRadius: 10,
        marginHorizontal: 5,
        marginVertical: 5
    },
    textInput: {
        borderWidth: 2,
        borderColor: "green",
        borderRadius: 15,
        paddingLeft: 20,
        fontSize: 20,
        width: "75%",
        marginVertical: 5
    },
    estiloBoton: {
        width: "25%",
        backgroundColor: "green",
        borderRadius: 30,
        paddingVertical: 10,
        marginVertical: 10,
        alignItems: "center"
    },
    botonAgregar: {
        fontSize: 20,
        color: "white"
    }
})

export default AgregarJugador;