import { Pressable, StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import React, { Fragment, useEffect, useState, useContext } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamasList } from '../utils/RootStackParam';
import { IJugador } from '../models/IJugador';
import firestore from '@react-native-firebase/firestore';
import { FlatList } from 'react-native-gesture-handler';
import ItemJugador from './items/ItemJugador';
import Navegacion from '../utils/Navegacion';
import { SpeedDial } from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import { contexto } from '../utils/AuthContext';


type Props = StackScreenProps<RootStackParamasList>;

const Principal = ({ navigation }: Props) => {
  const [Jugadores, setJugadores] = useState<IJugador[]>([]);
  const context = useContext(contexto)
  const [open, setOpen] = React.useState(false);


  function GetJugadores(){
    const suscriber = firestore().collection("Jugadores")
    .onSnapshot(snapshot => {
      snapshot && snapshot.forEach(doc => {
        const jugador = doc.data() as IJugador
        jugador.Id = doc.id
        setJugadores(Jugadores => [...Jugadores,jugador])
      })
    })
    return () => suscriber()
  }

/*   function GetJugadores() {
    const subscriber = firestore()
      .collection('Jugadores')
      .onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => {
          const jugador = doc.data() as IJugador;
          jugador.Id = doc.id;
          return jugador;
        });
        setJugadores(data);
      }, onError => {
        navigation.navigate("Login")
      });
    return subscriber;
  } */

  useEffect(() => {
    GetJugadores();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList data={Jugadores} renderItem={(e) =>
        
          <ItemJugador {...e.item} mostrar={() => navigation.navigate("Actualizar", { id: e.item.Id })}></ItemJugador>
        
      }></FlatList>

      <SpeedDial
        isOpen={open}
        icon={{ name: 'add', color: '#fff' }}
        openIcon={{ name: 'close', color: '#fff' }}
        onOpen={() => setOpen(!open)}
        onClose={() => setOpen(!open)}
        buttonStyle={{ backgroundColor: "orange" }}
      >
        <SpeedDial.Action
          icon={{ name: 'add', color: '#fff' }}
          title="Add"
          onPress={() => navigation.navigate('Agregar')}
          buttonStyle={{ backgroundColor: "orange" }}
        />
        <SpeedDial.Action
          icon={{ name: 'logout', color: '#fff' }}
          title="Delete"
          buttonStyle={{ backgroundColor: "red" }}
          onPress={() => {
            auth().signOut().then(() => {
              navigation.goBack()
            })

          }}
        />
      </SpeedDial>
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
  contenTexto: {
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
  botonEditar: {
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
  textoBoton: {
    color: "white"
  }
})