import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const NoticiaGrande = (prop : propNoticia) => {
    return (
        <View>
            <View style={estilos.contenedor}>
                <Text style={estilos.textoTitulo}>{prop.titulo}</Text>
                <Image style={estilos.imagenNoticia} source={prop.imagen}></Image>
                <Text style={estilos.textoPrincipal}>{prop.principal}</Text>
                <Text style={estilos.textoSecundario}>{prop.secundario}</Text>
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
        height: 400,
        backgroundColor: "white",
        borderRadius: 10,
        marginTop: 10,
        borderColor: "black",
        borderWidth: 2
    },
    imagenNoticia:{
        width:"100%",
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
        fontSize: 30,
        color: "black"
    },
    textoSecundario:{
        margin: 10,
        left: 10,
        fontSize: 20
    }
})

export default NoticiaGrande;