import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { IJugador } from '../../models/IJugador';
import { Image } from 'react-native-elements/dist/image/Image';
import Icon from 'react-native-vector-icons/FontAwesome';

const ItemJugador = (Props: IJugador) => {
  return (
    <View style={styles.contenedor}>
      <View style={styles.contenImagen}>
        <Image style={styles.imagen} source={{ uri: Props.Imagen }}></Image>
      </View>
      <View style={styles.contenTexto}>
        <Text style={styles.texto}>{"Nombre: " + Props.Nombre}</Text>
        <Text style={styles.texto}>{"Edad: " + Props.Edad}</Text>
        <Text style={styles.texto}>{"Pais: " + Props.Pais}</Text>
        <Pressable style={styles.botonEditar} >
          <Icon style={{marginRight: 5}} name="pencil" size={20} color={'white'}></Icon>
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