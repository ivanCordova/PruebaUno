import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ILikes } from '../models/ILikes'
import firestore from '@react-native-firebase/firestore';
import { IJugador } from '../models/IJugador';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamasList } from '../utils/RootStackParam';
import Icon from 'react-native-vector-icons/FontAwesome';
type Props = StackScreenProps<RootStackParamasList, "PersonasLikes">;



const PersonasLikes = ({ navigation, route }: Props) => {
  const { id } = route.params //{id} : toma el id que viene desde Principal
  const [like, setLike] = useState<ILikes[]>([])




  function GetJugador(id: string) {
    firestore()
      .collection("Jugadores")
      .doc(id).collection("Like")
      .get().then((item) => {
        const listaLikes = item.docs.map((doc) => {
          const likes = doc.data() as ILikes;
          likes.Id = doc.id;
          return likes
        })
        setLike(listaLikes)
      })
  }

  useEffect(() => {
    GetJugador(id);
  }, [])

  return (
    <View>
      <FlatList data={like} renderItem={(e) =>
        <View style={styles.botonEditar}>
          <Icon style={styles.icono} name="user-circle-o" size={50} color={'white'}></Icon>
          <Text style={styles.texto}>{e.item.Usuario}</Text>
        </View>
      }></FlatList>
    </View>
  )
}

export default PersonasLikes

const styles = StyleSheet.create({
  botonEditar: {
    flex: 1,
    flexDirection: "row",
    width: "90%",
    height: 70,
    backgroundColor: "green",
    margin: 2,
    alignSelf: "center",
    borderRadius: 15,
    marginVertical: 5
  },
  icono: {
    flex: 1,
    alignSelf: "center",
    marginHorizontal: 25
  },
  texto: {
    flex: 5,
    alignSelf: "center",
    fontSize: 22,
    marginHorizontal: 2
  }
})