import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import ImagenComponent from "./ImagenComponent";

const ListaComponent = () =>{
    const imagenes = [
        {id: 1,ruta: require("../../../assets/camaro.jpg")},
        {id: 2,ruta: require("../../../assets/camaro.jpg")},
        {id: 3,ruta: require("../../../assets/camaro.jpg")},
        {id: 4,ruta: require("../../../assets/camaro.jpg")},
        {id: 5,ruta: require("../../../assets/camaro.jpg")}
    ];


    return(
        <ScrollView>
            <View style={estilo.contenedor}>
                {imagenes.map((imagen) =>
                    <ImagenComponent key={imagen.id} ruta={imagen.ruta}></ImagenComponent>
                )}
            </View>
        </ScrollView>
    )
}

const estilo = StyleSheet.create({
    contenedor:{
        flex: 1,
        justifyContent: "flex-start",
        alignContent: "flex-start"
    }
})

export default ListaComponent;