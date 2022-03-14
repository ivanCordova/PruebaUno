import React from "react";
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ItemProducto = (props : propProducto) =>{
    const onclick = (precio : number, nombre: string) =>{
        Alert.alert("Información",`Nombre: ${nombre}\nPrecio: ${precio}`)
    } 

    return(
        <View style={estilos.contenedor}>
            <View>
                <Image style={estilos.imagen} source={{uri: props.imagen}}></Image>
            </View>
            <View style={estilos.contTexto}>
                <Text style={[estilos.texto,{color:"red"}]}>{props.nombre}</Text>
                <Text style={estilos.texto}>Precio: ${props.precio}.00</Text>
                <TouchableOpacity style={estilos.boton} onPress={() => onclick(props.precio,props.nombre)}>
                        <Text style={[estilos.texto,{color:"white"}]} >Información</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

interface propProducto{
    imagen: string,
    nombre: string,
    precio: number
}

const estilos = StyleSheet.create({
    contenedor:{
        flex: 1,
        flexWrap:'wrap',
        flexDirection: 'row'
    },
    boton:{
        backgroundColor: "blue", 
        marginTop: 20, 
        padding:8,
        borderRadius: 20
    },
    contTexto:{
        justifyContent:"center", 
        alignItems: "center", 
        padding: 10
    },
    imagen:{
        width: 150,
        height: 150,
        margin: 30
    },
    texto:{
        margin: 2,
        fontSize: 25,
        color: "black",
        fontWeight: "bold"
    }
})

export default ItemProducto;