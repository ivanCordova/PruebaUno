import { Pressable, StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import React, { Fragment, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamasList } from '../utils/RootStackParam';
import { IJugador } from '../models/IJugador';
import firestore from '@react-native-firebase/firestore';
import { FlatList } from 'react-native-gesture-handler';
import ItemJugador from './items/ItemJugador';
import Navegacion from '../utils/Navegacion';

type Props = StackScreenProps<RootStackParamasList>;

const Principal = ({ navigation }: Props) => {
    const [Jugadores, setJugadores] = useState<IJugador[]>([]);


    function GetJugadores() {
        const subscriber = firestore()
            .collection('Jugadores')
            .onSnapshot(snapshot => {
                const data = snapshot.docs.map(doc => {
                    const jugador = doc.data() as IJugador;
                    jugador.Id = doc.id;
                    return jugador;
                });
                setJugadores(data);
            });
        return subscriber;
    }

    useEffect(() => {
        GetJugadores();
    }, []);

    return (
        <View style={styles.container}>
            <FlatList data={Jugadores} renderItem={(e) =>
                    <View style={stylesItem.contenedor}>
                    <View style={stylesItem.contenImagen}>
                      <Image style={stylesItem.imagen} source={{ uri: e.item.Imagen }}></Image>
                    </View>
                    <View style={stylesItem.contenTexto}>
                      <Text style={stylesItem.texto}>{"Nombre: " + e.item.Nombre}</Text>
                      <Text style={stylesItem.texto}>{"Edad: " + e.item.Edad}</Text>
                      <Text style={stylesItem.texto}>{"Pais: " + e.item.Pais}</Text>
                      <Pressable style={stylesItem.botonEditar} onPress={() => navigation.navigate("Actualizar", { id: e.item.Id })}>
                        <Icon style={{marginRight: 5}} name="pencil" size={20} color={'white'}></Icon>
                        <Text style={stylesItem.textoBoton}>Editar</Text>
                      </Pressable>
                    </View>
                  </View>

                    
/*                 <Pressable onPress={() => navigation.navigate("Actualizar", { id: e.item.Id })}>
                    <View style={styles.jugadorItem}>
                        <Icon name='user' size={25} color="#D83F1E"></Icon>
                        <Text style={styles.textoJugador}>{e.item.Nombre}</Text>
                        <Icon name='chevron-right' size={20} color="#D83F1E"></Icon>
                    </View>
                </Pressable> */
            }></FlatList>

            <Pressable
                style={styles.botonAgregra}
                onPress={() => navigation.navigate('Agregar')}>
                <View style={styles.iconoFB}>
                    <Icon name="plus" size={25} color={'white'}></Icon>
                </View>
            </Pressable>
        </View>
    );
};

export default Principal;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    botonAgregra: {
        position: 'absolute',
        borderRadius: 50,
        backgroundColor: '#D83F1E',
        color: 'white',
        width: 65,
        height: 65,
        bottom: 10,
        right: 10,
        justifyContent: 'center',
        elevation: 4,
    },
    iconoFB: {
        alignSelf: 'center',
    },
    jugadorItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 8,
        paddingVertical: 15,
        paddingLeft: 25,
        paddingRight: 10,
        marginVertical: 5,
        marginHorizontal: 15,
        elevation: 4,
        justifyContent: "space-between"
    },
    textoJugador: {
        color: "black",
        fontSize: 15,
        fontWeight: "bold",
        flex: 1,
        marginLeft: 8
    }
});

const stylesItem = StyleSheet.create({
    contenedor: {
      flexDirection: "row",
      backgroundColor: "orange",
      width: "95%",
      height: 200,
      margin: 2,
      borderRadius: 15,
      alignSelf: "center"
    },
    contenImagen: {
      padding: 20,
      alignSelf: "center"
    },
    contenTexto:{
      justifyContent: "center"
    },
    imagen: {
      width: 170,
      height: 180,
      borderRadius: 10
    },
    texto: {
      fontSize: 20,
      color: "black",
      marginVertical: 5
    },
    botonEditar:{
      backgroundColor: "green",
      width: 100,
      height: 30,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      marginTop: 10,
      flexDirection: "row"
    },
    textoBoton:{
      color: "white"
    }
  })