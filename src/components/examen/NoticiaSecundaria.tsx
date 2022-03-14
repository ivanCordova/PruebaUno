import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const NoticiaSecundaria = (prop : propNoticia) => {
    return (
        <View>
            <View style={estilos.contenedor}>
                <Image style={estilos.imagenNoticia} source={prop.imagen}></Image>
                <View>
                    <Text style={estilos.textoPrincipal}>{prop.principal}</Text>
                    <Text style={estilos.textoSecundario}>{prop.secundario}</Text>
                </View>
            </View>
        </View>
    );
};

interface propNoticia{
    titulo: string,
    principal: string,
    secundario: string,
    imagen: any,

}

const estilos = StyleSheet.create({
    contenedor:{
        width: "98%",
        height: 200,
        backgroundColor: "white",
        borderRadius: 10,
        marginTop: 10,
        borderColor: "black",
        flexDirection: "row",
        borderWidth: 2
    },
    imagenNoticia:{
        width:"40%",
        height: 200,
        borderRadius: 20,
        marginHorizontal: 5,
        resizeMode: "contain"
    },
    textoTitulo:{
        color: "black",
        margin: 20,
        fontSize: 20
    },
    textoPrincipal:{
        margin: 10,
        left: 10,
        fontSize: 20,
        color: "black"
    },
    textoSecundario:{
        margin: 10,
        left: 5,
        fontSize: 20
    }
})

export default NoticiaSecundaria;