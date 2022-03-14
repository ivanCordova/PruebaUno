import React, { useState } from 'react';
import { Alert, FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

const TextInputComponent = () => {
    const [nombre, setNombre] = useState<string>("")
    const [nombres, setNombres] = useState<string[]>([])
    interface itemNombreProps{
        item: string
    }
    const ItemNombre = ({ item }: itemNombreProps) => {
        return (
            <View style={{flexDirection:"row", alignItems:"center"}}>
                <Text style={{ marginVertical: 10, fontSize: 25, paddingHorizontal: 20, flex:1 }}>{item}</Text>
                <Pressable onPress={()=>{setNombres(nombres.filter((x) => x != item))}} style={{width:60,height:25, backgroundColor:"red", marginHorizontal: 10}}>
                    <Text>Eliminar</Text>
                </Pressable>
                {/* <View style={{width:25,height:25, backgroundColor:"red", marginHorizontal: 10}}></View> */}
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Text>Ejercicio TextInput</Text>
            <TextInput style={styles.textInput} onChangeText={(texto) => setNombre(texto)} value={nombre}></TextInput>
            <Text style={styles.textoNombre}>{nombre}</Text>


            <View style={styles.containerOpciones}>
                <Pressable style={nombres.length > 0 ? styles.btn : styles.btn2} onPress={() => {
                    if (nombre != '') {
                        setNombres([...nombres, nombre])
                        setNombre("")
                    } else {
                        Alert.alert("Error", "No debe ir vacio")
                    }
                }}>
                    <Text style={styles.btnTexto}>Agregar</Text>
                </Pressable>
                <Pressable style={styles.btn2} onPress={() => {
                    setNombres([])
                }}>
                    <Text style={[styles.btnTexto, { color: "white" }]}>Quitar</Text>
                </Pressable>
            </View>

            <FlatList style={{ width: "100%" }} data={nombres} renderItem={(e) =>
                <ItemNombre item={e.item}></ItemNombre>
            }></FlatList>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    textInput: {
        borderWidth: 2,
        borderColor: "black",
        marginHorizontal: 15,
        borderRadius: 15,
        paddingLeft: 20,
        fontSize: 20,
        width: "50%"
    },
    textoNombre: {
        fontSize: 40,
        fontWeight: "bold"
    },
    btn: {
        width: 100,
        height: 50,
        borderRadius: 10,
        borderColor: "black",
        backgroundColor: "orange",
        alignItems: "center",
        justifyContent: "center"
    },
    btn2: {
        width: 100,
        height: 50,
        borderRadius: 10,
        borderColor: "white",
        backgroundColor: "green",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 7
    },
    btnTexto: {
        fontWeight: "bold",
        color: "black",
        fontSize: 15
    },
    containerOpciones: {
        flexDirection: "row",
        marginHorizontal: 7
    }
})

export default TextInputComponent;