import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import CajaImagenes from "./CajaImagen";

const Imagenes = () => {
    const numeros = [
        {nombre: "camaro",image: require('../../../assets/camaro.jpg')},
        {nombre: "mustang",image: require('../../../assets/mustang.jpg')},
        {nombre: "impala",image: require('../../../assets/impala.jpg')},
        {nombre: "cadillac",image: require('../../../assets/cadillac.png')},
        {nombre: "shellby",image: require('../../../assets/shellby.jpg')}
      ];
    
      return(
        <View style={estilos.contenedor}>
          {numeros.map((n) =>
            <CajaImagenes key={n.nombre} ruta={n.image} ></CajaImagenes>
          )}
        </View>
      )
}

const estilos = StyleSheet.create({
    contenedor:{
        flex: 1,
        flexWrap:'wrap',
        flexDirection: 'column',
        alignContent:'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: 'white'
    }
})

export default Imagenes;