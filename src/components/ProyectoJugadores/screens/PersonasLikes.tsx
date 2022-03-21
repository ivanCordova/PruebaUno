import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ILikes } from '../models/ILikes'
import firestore from '@react-native-firebase/firestore';
import { IJugador } from '../models/IJugador';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamasList } from '../utils/RootStackParam';
type Props = StackScreenProps<RootStackParamasList, "PersonasLikes">;



const PersonasLikes = ({ navigation, route }: Props) => {
  const { id } = route.params //{id} : toma el id que viene desde Principal
  const [like, setLike] = useState<ILikes[]>([])




  function GetLikes() {
    const subscriber = firestore()
      .collection('Jugadores').doc(id)
      .collection("Like")
      .onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => {
          const likes = doc.data() as ILikes;
          likes.Id = doc.id;
          return likes;
        });
        setLike(data)
      }, (err) => {
      });
    return subscriber;
  }



  useEffect(() => {
    GetLikes()
  },[])

  return (
    <View>
      <Pressable onPress={() => {
        console.log(like)
      }} style={styles.botonEditar} >
        <Text>Editar</Text>
      </Pressable>
    </View>
  )
}

export default PersonasLikes

const styles = StyleSheet.create({
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
  }
})