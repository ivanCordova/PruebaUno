import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const ItemPartido = () => {
    return (
        <View style={estilos.contenedor}>
            <View style={estilos.infoEquipo}>
                <Image style={estilos.imagenEquipo} source={require("../../../assets/futbol/america.png")} ></Image>
                <Text style={estilos.nombreEquipo}>America</Text>
            </View>
            <Text style={estilos.textoHora}>01:45 pm</Text>
            <View style={estilos.infoEquipo}>
                <Image style={estilos.imagenEquipo} source={require("../../../assets/futbol/america.png")} ></Image>
                <Text style={estilos.nombreEquipo}>America</Text>
            </View>
        </View>
    );
};

const estilos = StyleSheet.create({
    contenedor: {
        flexDirection: "row",
        width: "98%",
        height: 100,
        backgroundColor: "black",
        borderRadius: 20,
        marginTop: 10,
        justifyContent: "space-evenly",
        alignItems: "center",
        

    },
    nombreEquipo: {
        color: "white",
        fontSize: 20
    },
    imagenEquipo: {
        width: 50,
        height: 50,
        resizeMode: "contain" 
    },
    textoHora: {
        color: "black",
        fontSize: 20,
        backgroundColor: "grey",
        marginHorizontal: 15,
        padding: 15,

    },
    infoEquipo: {
        alignItems:"center"
    }
})

export default ItemPartido;