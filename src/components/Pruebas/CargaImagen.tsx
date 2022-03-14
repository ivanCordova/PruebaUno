import React from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import data from "../examen/imagenes";

const CargaImagen = () =>{
    return(
        <View>
        <ScrollView>
        {data.assets.map((imagen, i)=>
            <Image style={estilos.imagen} key={i} source={imagen.img}></Image>
        )}
        </ScrollView>

    </View>
    )
}

const estilos = StyleSheet.create({
    imagen:{
        width: 100,
        height: 100,
        resizeMode: "contain" 
    }
})

export default CargaImagen