import React from "react";
import { StyleSheet, View } from "react-native";
import CajaNumero from "./CajaNumero";

const NumerosColores = () =>{
    const numeros = [
        {color : "gray", texto : "1"},
        {color : "purple", texto : "2"},
        {color : "orange", texto : "3"},
        {color : "blue", texto : "4"},
        {color : "red", texto : "5"},
        {color : "pink", texto : "6"},
        {color : "brown", texto : "7"}
      ];
    
    return (
        <View style={estilos.contenedor}>
      {numeros.map((n) =>
        <CajaNumero key={n.color} {...n}></CajaNumero>
      )}
    </View>
    )
}


const estilos = StyleSheet.create({
    contenedor:{
      flex: 1,
      flexWrap:'wrap',
      flexDirection: 'row',
      alignContent:'center',
      justifyContent: 'center',
      backgroundColor: 'white'
    }
  });

export default NumerosColores;