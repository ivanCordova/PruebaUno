import React from "react";
import { Image, SafeAreaView, SafeAreaViewBase, ScrollView, StyleSheet, Text, View } from "react-native";
import data from './informacion'

const ProgramacionComponent = () => {
    return (
        <SafeAreaView>
            <ScrollView>
                <Image style={estilos.banner} source={data.banner.img}></Image>
                <Text style={estilos.nombre}>Ivan Cordova</Text>
                <View style={estilos.contenedorLenguajes}>
                    <Text style={estilos.textoLenguajes}>{data.lenguajes.title}</Text>
                    <Image style={estilos.iconoLenguajes} source={data.lenguajes.rightIcon}></Image>
                </View>
                <ScrollView horizontal>
                    {data.lenguajes.assets.map((lenguaje, i) => 
                        <Image style={estilos.imagenLenguaje} key={i} source={lenguaje.img}></Image>
                    )}
                </ScrollView>
                <View>
                    <Text style={estilos.textoIDE}>{data.ides.title}</Text>
                </View>
                {data.ides.assets.map((ide, i)=>
                    <Image style={estilos.imagenIDE} key={i} source={ide.img}></Image>
                )}
                <View>
                    <Text style={estilos.textoFotos}>{data.otros.title}</Text>
                    <View style={estilos.contenedorOtros}>
                        {data.otros.assets.map((o,i) =>
                            <Image style={estilos.imagenFotos} key={i} source={o.img}></Image>
                        )}
                    </View>
                </View>
            </ScrollView>
            <View style={estilos.fb}></View>
        </SafeAreaView>
    )
}

const estilos = StyleSheet.create({
    banner:{
        width: "100%",
        height: 200,
        borderBottomRightRadius: 50,
        borderTopLeftRadius: 50
        /*marginHorizontal: 5,
        marginVertical: 10 */
    },
    nombre: {
        position: "absolute",
        color: "white",
        fontWeight: "bold",
        fontSize: 25,
        top: 0,
        //alignSelf: "center" /* Aplica al componente interno */
        width: "100%",
        textAlign: "center"
    },
    contenedorLenguajes:{
        flexDirection: "row",
        justifyContent: "space-between"
    },
    iconoLenguajes:{
        width: 30,
        height: 30,
        margin: 10
    },
    textoLenguajes:{
        fontSize:30,
        fontWeight: "bold",
        marginLeft: 10,
        color: "blue"
    },
    imagenLenguaje:{
        width: 150,
        height: 150,
        marginHorizontal: 10,
        resizeMode: "contain",
        borderRadius: 40
    },
    textoIDE:{
        fontSize:30,
        fontWeight: "bold",
        marginLeft: 10,
        color: "blue"
    },
    imagenIDE:{
        width: "100%",
        height: 300,
        margin: 3,
        borderRadius: 50,
        resizeMode: "contain" 
    },
    textoFotos:{
        fontSize:30,
        fontWeight: "bold",
        marginLeft: 10,
        color: "orange"
    },
    imagenFotos:{
        width: 150,
        height: 150,
        margin: 10,
        borderRadius: 10,
        resizeMode: "contain"
    },
    contenedorOtros:{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between"
    },
    fb:{
        position: "absolute",
        width: 80,
        height: 80,
        backgroundColor: "orange",
        bottom: 15,
        right: 15,
        borderRadius: 50
    }
})

export default ProgramacionComponent