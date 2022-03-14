import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";


const CajaImagenes = (props : elementoProps) => {
    return (
        <View>
            <Image style={estilos.imagen} source={props.ruta}></Image>
        </View>
    )
}

const estilos  = StyleSheet.create({
    imagen:{
        width: 200,
        height: 200,
        margin: 2
    }
})

interface elementoProps{
    ruta: any
}

export default CajaImagenes;