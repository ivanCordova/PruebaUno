import React from "react";
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ListaNombresComponent = () =>{
    const personas = [
        {Id: 1, Nombre: "Hugo"},
        {Id: 2, Nombre: "paco"},
        {Id: 3, Nombre: "Luis"},
        {Id: 4, Nombre: "Marco"},
        {Id: 5, Nombre: "Antonio"},
        {Id: 6, Nombre: "Issac"}
    ];
    
    const onclick = (id : number) =>{
        const persona = personas.find((p) =>{
            return p.Id == id
        })
        Alert.alert("Información",`Nombre de las personas: ${persona?.Nombre}`)
    } 

    const separador = () =>{
        return(
            <View style={estilos.estilo}></View>
        )
    }

    return(
        <View>
            <FlatList data={personas} renderItem={(persona) => (
                <View style={estilos.itemList}>
                    <TouchableOpacity>
                        <Text onPress={() => onclick(persona.item.Id)} style={estilos.texto}>{persona.item.Nombre}</Text>
                    </TouchableOpacity>
                </View>
            )} ItemSeparatorComponent={separador}></FlatList>
        </View>
    )
} 

const estilos = StyleSheet.create({
    contenedor:{
        flex: 1
    },
    texto:{
        color: "white",
        fontSize: 30
    },
    itemList:{
        margin: 15,
        backgroundColor: "green"
    },
    estilo:{
        height: 1,
        backgroundColor: "black",
        marginVertical: 5
    }
})

export default ListaNombresComponent;