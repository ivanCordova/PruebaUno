import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamasList } from '../utils/RootStackParam';
import { IJugador } from '../models/IJugador';
import firestore from '@react-native-firebase/firestore';
import { FlatList } from 'react-native-gesture-handler';

type Props = StackScreenProps<RootStackParamasList, 'Agregar'>;

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
                <Pressable onPress={() => navigation.navigate("Actualizar", {id: e.item.Id})}>
                    <View style={styles.jugadorItem}>
                        <Icon name='user' size={25} color="#D83F1E"></Icon>
                        <Text style={styles.textoJugador}>{e.item.Nombre}</Text>
                        <Icon name='chevron-right' size={20} color="#D83F1E"></Icon>
                    </View>
                </Pressable>
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
        flex: 1,
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
    jugadorItem:{
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
    textoJugador:{
        color: "black",
        fontSize: 15,
        fontWeight: "bold",
        flex: 1,
        marginLeft: 8
    }
});
