import React, { Component } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import data from "../examen/imagenes"
import ItemPartido from './ItemPartido';


const Prueba = () => {
    return (
        <View>
            <SafeAreaView>
                <ScrollView>
                    <Image style={estilos.Imagenbanner} source={data.banner.img} ></Image>
                    <View style={estilos.filtro}></View>
                    <Text style={estilos.TextoBanner}>PARTIDOS</Text>
                    <View style={{ alignItems: "center" }}>
                        {data.assets.map((item, i) =>
                            <ItemPartido></ItemPartido>
                        )}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

const estilos = StyleSheet.create({
    filtro:{
        position:"absolute",
        backgroundColor:"black",
        width:"100%", 
        height: 200,
        opacity: 0.7,
        borderBottomRightRadius: 50,
        borderBottomLeftRadius: 50
    },
    Imagenbanner:{
        width: "100%",
        height: 200,
        borderBottomRightRadius: 50,
        borderBottomLeftRadius: 50
    },
    TextoBanner:{
        position: "absolute",
        color: "white",
        fontWeight: "bold",
        fontSize: 40,
        top: 75,
        width: "100%",
        textAlign: "center"
    }
})

export default Prueba;