import React from "react";
import { Image, ImageSourcePropType, StyleSheet } from "react-native";

const ImagenComponent = (props : ImagenProps) =>{
    return(
        <Image style={estilo.imagen} source={props.ruta}></Image>
    )
}

interface ImagenProps{
    ruta: ImageSourcePropType;
}

const estilo = StyleSheet.create({
    imagen:{
        width: 200,
        height: 200,
        margin: 10
    }
})

export default ImagenComponent;