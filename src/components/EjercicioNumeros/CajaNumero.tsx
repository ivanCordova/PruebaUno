import React from "react";
import { StyleSheet, Text, View } from "react-native";

const CajaNumero = (props : elementoProps) => {
    return (
        <View style={[estilos.elemento, {backgroundColor:props.color}]}>
            <Text style={estilos.texto}>{props.texto}</Text>
        </View>
    )
}

interface elementoProps{
    color : string;
    texto : string;
}

const estilos = StyleSheet.create({
    elemento:{
        width: 100,
        height: 100,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center'
      },
      texto:{
        fontSize:30,
        fontWeight:"bold",
        color:'white'
      }
});

export default CajaNumero;