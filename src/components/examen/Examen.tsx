import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import ItemPartido from "../examen/ItemPartido";
import data from "./imagenes";
import NoticiaGrande from "./NoticiaGrande";
import NoticiaSecundaria from "./NoticiaSecundaria";

const Examen = () => {
    return (
        <View>
            <ScrollView>
                <Image style={estilos.Imagenbanner} source={data.banner.img} ></Image>
                <View style={estilos.filtro}></View>
                <Text style={estilos.TextoBanner}>PARTIDOS</Text>
                <View style={{alignItems:"center"}}>
                    <ItemPartido equipoUno={data.america.nombre} equipoDos={data.chivas.nombre} imagenUno={data.america.img} imagenDos={data.chivas.img} nombresUno="Ronaldo" nombresDos="Ronaldo" golesUno={1} golesDos={2}></ItemPartido>
                    <ItemPartido equipoUno={data.bayern.nombre} equipoDos={data.barcelona.nombre} imagenUno={data.bayern.img} imagenDos={data.barcelona.img} nombresUno="Ronaldo" nombresDos="Ronaldo" golesUno={3} golesDos={2}></ItemPartido>
                    <ItemPartido equipoUno={data.realMadrid.nombre} equipoDos={data.atletico.nombre} imagenUno={data.realMadrid.img} imagenDos={data.atletico.img} nombresUno="Ronaldo" nombresDos="Ronaldo" golesUno={2} golesDos={2}></ItemPartido>
                </View>
                <NoticiaGrande titulo={data.messi.titulo} principal={data.messi.principal} secundario={data.messi.secundario} imagen={data.messi.img}></NoticiaGrande>
                <NoticiaSecundaria titulo={data.mexico.titulo} principal={data.mexico.principal} secundario={data.mexico.secundario} imagen={data.mexico.img}></NoticiaSecundaria>
                <NoticiaGrande titulo={data.real.titulo} principal={data.real.principal} secundario={data.real.secundario} imagen={data.real.img}></NoticiaGrande>
                <NoticiaSecundaria titulo={data.brasil.titulo} principal={data.brasil.principal} secundario={data.brasil.secundario} imagen={data.brasil.img}></NoticiaSecundaria>
            </ScrollView>
        </View>
    )
}

const estilos = StyleSheet.create({
    filtro: {
        position: "absolute",
        backgroundColor: "black",
        width: "100%",
        height: 200,
        opacity: 0.7,
        borderBottomRightRadius: 50,
        borderBottomLeftRadius: 50
    },
    Imagenbanner: {
        width: "100%",
        height: 200,
        borderBottomRightRadius: 50,
        borderBottomLeftRadius: 50
    },
    TextoBanner: {
        position: "absolute",
        color: "white",
        fontWeight: "bold",
        fontSize: 40,
        top: 75,
        width: "100%",
        textAlign: "center"
    }
})

export default Examen;