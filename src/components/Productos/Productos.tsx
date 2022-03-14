import React from "react";
import { FlatList, ScrollView, ScrollViewBase, StyleSheet, View } from "react-native";
import ItemProducto from "./ItemProductos";

const Productos = () =>{
    const productos = [
        {nombre : "Zote", precio : 15, imagen : "https://d1zc67o3u1epb0.cloudfront.net/media/catalog/product/cache/23527bda4807566b561286b47d9060f4/1/1/1183-jabon-zote-en-barra-rosa-400-gramos.jpg"},
        {nombre : "Roma", precio : 36, imagen : "https://http2.mlstatic.com/D_NQ_NP_746749-MLA47567442461_092021-W.jpg"},
        {nombre : "Axión", precio : 46, imagen : "https://res.cloudinary.com/walmart-labs/image/upload/w_960,dpr_auto,f_auto,q_auto:best/gr/images/product-images/img_large/00750954605193L.jpg"},
        {nombre : "Fabuloso", precio : 20, imagen : "https://ibarramayoreo.com/images/IMAGENES/1709/01.jpg"},
        {nombre : "Cloro", precio : 10, imagen : "https://www.smartnfinal.com.mx/wp-content/uploads/2016/08/92067-Cloro-blanqueador-Cloralex-3.78-l.jpg"},
        {nombre : "Pinol", precio : 50, imagen : "https://res.cloudinary.com/walmart-labs/image/upload/w_960,dpr_auto,f_auto,q_auto:best/gr/images/product-images/img_large/00750102540305L.jpg"},
        {nombre : "Mas color", precio : 60, imagen : "https://ibarramayoreo.com/images/IMAGENES/42384/01.jpg"}
    ]
    
    const separador = () =>{
        return(
            <View style={estilos.separador}></View>
        )
    }

    return (
        <ScrollView>
            <View style={estilos.contenedor}>
                <FlatList data={productos} renderItem={(n) => (
                    <ItemProducto key={n.item.nombre} imagen={n.item.imagen} nombre={n.item.nombre} precio={n.item.precio}></ItemProducto>
                )} ItemSeparatorComponent={separador}>
                </FlatList>
            </View>
        </ScrollView>
    )
}

const estilos = StyleSheet.create({
    separador:{
        height: 1,
        backgroundColor: "black",
        marginVertical: 8
    },
    contenedor:{
        backgroundColor: "white"
    }
})

export default Productos