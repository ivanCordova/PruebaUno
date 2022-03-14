import React, { useState } from 'react';
import { Text, View, TouchableHighlight, TouchableOpacity, StyleSheet } from 'react-native';

const BasicoComponent = () => {
    let contador = 0;
    const [cont, setCont] = useState<number>(0)
    const pressDisminuir = () =>{
        setCont(cont - 1);
    }
    return (
        <View style={estilos.contenedor}>
            <Text style={estilos.texto}>{cont}</Text>
            <TouchableHighlight style={estilos.botonMas} onPress={(e) => setCont(Math.floor(Math.random() * 1000))}>
                <View>
                    <Text style={estilos.texto_boton}>Más</Text>
                </View>
            </TouchableHighlight>
            <TouchableHighlight style={estilos.botonMenos} onPress={pressDisminuir}>
                <View>
                    <Text style={estilos.texto_boton}>Menos</Text>
                </View>
            </TouchableHighlight>
        </View>
    );
};

const estilos = StyleSheet.create({
    contenedor:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10
    },
    texto:{
        fontSize: 40,
        marginHorizontal: 10
    },
    botonMas:{
        width: "50%",
        backgroundColor: "green",
        paddingVertical: 5,
        borderRadius: 20,
        marginVertical: 5
    },
    botonMenos:{
        width: "50%",
        backgroundColor: "blue",
        paddingVertical: 5,
        borderRadius: 20,
        marginVertical: 5
    },
    texto_boton:{
        fontSize: 40,
        color: "white",
        textAlign: "center"
    }
})
export default BasicoComponent;