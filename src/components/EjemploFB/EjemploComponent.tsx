import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { Alert, Pressable, Text, View } from 'react-native';

const EjemploComponent = () => {
    
    const [jugadoresArray, setJugadoresArray] = useState<IJugadores[]>([])

    interface IJugadores{
        Nombre: string,
        Edad: number,
        Pais: string
    }
    async function GetJugadores(){
        const jugadores = await firestore().collection('Jugadores').get();
        console.log(jugadores.docs);
        setJugadoresArray(jugadores.docs.map((j) => j.data() as IJugadores))
    }


    useEffect(() =>{
        //GetJugadores();
        const subscriber = firestore()
          .collection('Jugadores')
          .onSnapshot(documentSnapshot => {
            const data = documentSnapshot.docs.map((item)=>
              item.data() as IJugadores
            )
            setJugadoresArray(data);
          });
        // Stop listening for updates when no longer required
        return () => subscriber();
    }, [])

    return (
        <View>
            <Pressable style={{ backgroundColor: 'red' }}
                onPress={(e) => {
                    firestore()
                        .collection('Jugadores')
                        .add({
                            Nombre: 'Mbappe',
                            Pais: 'Francia',
                            Edad: 23
                        })
                        .then(() => {
                            Alert.alert("Agregado", "Jugador Agregado");
                        });
                }}
            ><Text style={{ color: 'white' }}>Enviar Información</Text></Pressable>
            {jugadoresArray.map((e, i) =>
                <Text key={i}>{e.Nombre}</Text>
            )}
        </View>
    );
};

export default EjemploComponent;