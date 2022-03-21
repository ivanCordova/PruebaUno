import { Alert, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { IJugador } from '../../models/IJugador';
import { Image } from 'react-native-elements/dist/image/Image';
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import { ILikes } from '../../models/ILikes';
import { contexto } from '../../utils/AuthContext';



const ItemJugador = (Props: IJugador) => {

  const [like, setLike] = useState<ILikes[]>([])
  const context = useContext(contexto)
  

  const newLike = ()=>{
    (like.find((l) => l.UserId === context.usuario.UserId))
    ?
    firestore()
    .collection("Jugadores")
    .doc(Props.Id)
    .collection("Like")
    .doc(like.find((l) => l.UserId === context.usuario.UserId)?.Id)
    .delete()
    :
    firestore()
    .collection("Jugadores")
    .doc(Props.Id)
    .collection("Like")
    .add({
      Documento: Props.Id,
      Usuario: context.usuario.Correo,
      UserId: context.usuario.UserId
    }).then(() => {
      console.log("like agregado")
    })
  }


    function GetLikes() {
      console.log(Props.Id);
    const subscriber = firestore()
      .collection('Jugadores').doc(Props.Id)
      .collection("Like")
      .onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => {
          const likes = doc.data() as ILikes;
          likes.Id = doc.id;
          return likes;
        });
        setLike(data)
      },(err) => {
      });
      console.log("ItemJugador:"+like)
    return subscriber;
  }



  useEffect(() => {
    GetLikes()
  }, [])

  

  return (
    <View style={styles.contenedor}>
      <View style={styles.contenedorLikes}>
        <TouchableOpacity style={styles.personasLikes} onPress={Props.personasLikes}>
          <Text style={styles.textoLikes}>juan ...</Text>
        </TouchableOpacity>
        <Pressable style={styles.likes} onPress={newLike}>
          <Icon name={like.find((l) => l.UserId === context.usuario.UserId)?"heart":"heart-o"} size={30} color={'white'}></Icon>
        </Pressable>
      </View>
      <View style={styles.contenImagen}>
        <Image style={styles.imagen} source={{ uri: Props.Imagen }}></Image>
      </View>
      <View style={styles.contenTexto}>
        <Text style={styles.texto}>{"Nombre: " + Props.Nombre}</Text>
        <Text style={styles.texto}>{"Edad: " + Props.Edad}</Text>
        <Text style={styles.texto}>{"Pais: " + Props.Pais}</Text>
        <Pressable onPress={Props.mostrar} style={styles.botonEditar} >
          <Icon style={{ marginRight: 5 }} name="pencil" size={20} color={'white'}></Icon>
          <Text style={styles.textoBoton}>Editar</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default ItemJugador

const styles = StyleSheet.create({
  contenedor: {
    flexDirection: "row",
    backgroundColor: "orange",
    width: "95%",
    height: 300,
    margin: 2,
    borderRadius: 15,
    alignSelf: "center",
    flexWrap: "wrap"
  },
  contenImagen: {
    padding: 20,
    alignSelf: "center",
    marginTop: -30
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
  },
  contenedorLikes: {
    width: "100%",
    height: 30,
    flexDirection: "row",
    margin: 5
  },
  personasLikes: {
    flex: 8,
  },
  likes: {
    flex: 1,
  },
  textoLikes:{
    fontSize: 20
  }
})