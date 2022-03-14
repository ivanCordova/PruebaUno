import React, { useState } from 'react';
import { View, Text, TouchableHighlight, ScrollView, StyleSheet, FlatList } from 'react-native';

const ArregloEstados = () => {
    const [numeros, setNumeros] = useState<number[]>([21,23,18,30,7,10]);
    const agregar = () =>{
        //setNumeros([...numeros,10])
        setNumeros(numeros.concat(Math.floor(Math.random() * 1000)))
    }

    return (
        <View style={{flex: 1}}>
            <View style={estilos.contenedorBoton}>
                <TouchableHighlight style={estilos.botonAgregar} onPress={agregar}>
                    <Text>Agregar</Text>
                </TouchableHighlight>
            </View>
            <View style={estilos.contenedorLista}>
                    <FlatList data={numeros} renderItem={(item) =>
                        <Text style={estilos.textoNumero}>{item.item}</Text>
                    }>
                    </FlatList>
            </View>
        </View>
    );
};

const estilos = StyleSheet.create({
    contenedorBoton:{
        flex: 2,
        backgroundColor: "green",
        width: "100%",
        height: 300,
        alignItems: "center",
        justifyContent: "center"

    },
    botonAgregar:{
        backgroundColor: "white",
        borderRadius: 30,
        padding: 30
    },
    contenedorLista:{
        flex: 4,
        backgroundColor: "blue",
    },
    textoNumero:{
        fontSize: 50,
        color: "white",
        alignSelf: "center"
    }
})

export default ArregloEstados;