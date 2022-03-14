import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const ItemPartido = (prop : propItem ) => {
    return (
        <View style={estilos.contenedor}>
            <View style={estilos.contenedorMarcador}>
                <View style={estilos.infoEquipo}>
                    <Image style={estilos.imagenEquipo} source={prop.imagenUno} ></Image>
                    <Text style={estilos.nombreEquipo}>{prop.equipoUno}</Text>
                </View>
                <Text style={estilos.textoHora}>{`${prop.golesUno}  -  ${prop.golesDos}`}</Text>
                <View style={estilos.infoEquipo}>
                    <Image style={estilos.imagenEquipo} source={prop.imagenDos} ></Image>
                    <Text style={estilos.nombreEquipo}>{prop.equipoDos}</Text>
                </View>
            </View>
            <View style={estilos.contenedorNombres}>
                    <View>
                        <Text style={estilos.textoNombres}>{prop.nombresUno}</Text>
                    </View>
                    <View>
                        <Text style={estilos.textoNombres}>{prop.nombresDos}</Text>
                    </View>
            </View>
        </View>

    );
};

interface propItem{
    equipoUno: string,
    equipoDos: string,
    imagenUno: any,
    imagenDos: any,
    nombresUno: string,
    nombresDos: string,
    golesUno: number,
    golesDos: number
}

const estilos = StyleSheet.create({
    contenedor:{
        width: "98%",
        height: 200,
        backgroundColor: "black",
        borderRadius: 20,
        marginTop: 10,
    },
    contenedorMarcador: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        top: 10
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
    },
    contenedorNombres:{
        top: 30,
        marginHorizontal: 50,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    textoNombres:{
        color: "white"
    }
})

export default ItemPartido;