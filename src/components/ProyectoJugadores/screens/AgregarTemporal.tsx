import { ActivityIndicator, Alert, Image, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage'
import { ImageLibraryOptions, ImagePickerResponse, launchCamera, launchImageLibrary } from 'react-native-image-picker';

const AgregarTemporal = () => {
  const [nombre, setNombre] = useState<string>("")
  const [edad, setEdad] = useState<number>(0)
  const [pais, setPais] = useState<string>("")
  const [imagen, setImagen] = useState("https://static.vecteezy.com/system/resources/previews/005/232/501/non_2x/photography-flat-outline-showing-capturing-camera-vector.jpg")
  const agregar = () => {
    firestore()
    .collection("Jugadores")
    .add({
        Nombre : nombre,
        Edad : edad,
        Pais: pais,
        Imagen : imagen
    }).then(()=>{
        Alert.alert("Correcto","Jugador agregado correctamente")
    })

  }

  async function SeleccionarImagenGaleria() {
    let opciones: ImageLibraryOptions = {
      mediaType: 'photo'
    };
    const result: ImagePickerResponse = await launchImageLibrary(opciones)
    if(result.assets){
      const url = result.assets[0].uri;
      setImagen(url!)// El signo ! indica que no sera indefinido
    }
  }

  async function TomarFotografia() {
    let opciones: ImageLibraryOptions = {
      mediaType: 'photo'
    };
    const result: ImagePickerResponse = await launchCamera(opciones)
    if(result.assets){
      const url = result.assets[0].uri;
      setImagen(url!)// El signo ! indica que no sera indefinido
    }
  }

  const SubirImagen = async () =>{
    const nombreArchivo = imagen.substring(imagen.lastIndexOf("/")+1)
    const uploadUri = Platform.OS == "ios" ? imagen.replace("file://",""): imagen
    const referencia = storage().ref(nombreArchivo)
    const task = referencia.putFile(uploadUri);
    task.then(async () =>{
      const link = await storage().ref(nombreArchivo).getDownloadURL()
      firestore()
      .collection("Jugadores")
      .add({
          Nombre : nombre,
          Edad : edad,
          Pais: pais,
          Imagen : link
      }).then(()=>{
          Alert.alert("Correcto","Jugador agregado correctamente")
      })  
    })

  }

  return (
    <View style={styles.contenedor}>
      <Image style={styles.imagen} source={{uri: imagen}}></Image>
      <View style={styles.botonesFoto}>
        <Pressable style={styles.botonFoto} onPress={SeleccionarImagenGaleria}>
          <Text style={styles.textoBoton}>Obtener foto de librería</Text>
        </Pressable>
        <Pressable style={styles.botonFoto} onPress={TomarFotografia}>
          <Text style={styles.textoBoton}>Abrir camara</Text>
        </Pressable>
      </View>
      <TextInput placeholder='Nombre' onChangeText={(e) => setNombre(e)} value={nombre} style={styles.textInput}></TextInput>
      <TextInput keyboardType="numeric" onChangeText={(e) => setEdad(parseInt(e))} value={edad.toString()} style={styles.textInput}></TextInput>
      <TextInput placeholder='País'onChangeText={(e) => setPais(e)} value={pais} style={styles.textInput}></TextInput>
      <View style={styles.contenedorBotones}>
        <Pressable style={styles.boton} onPress={SubirImagen}>
          <Text style={styles.textoBoton}>Agregar</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default AgregarTemporal

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
  },
  textInput: {
    marginVertical: 15,
    borderWidth: 2,
    borderColor: "black",
    marginHorizontal: 15,
    borderRadius: 15,
    paddingLeft: 20,
    fontSize: 15,
    backgroundColor: "white"
  },
  contenedorBotones: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center'

  },
  boton: {
    width: "80%",
    height: 50,
    borderRadius: 10,
    backgroundColor: "green",
    borderColor: "black",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 2
  },  
  botonFoto: {
    width: "40%",
    height: 50,
    borderRadius: 10,
    backgroundColor: "green",
    borderColor: "black",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 2
  },
  textoBoton: {
    fontSize: 15,
    color: "white",
    fontWeight: "bold"
  },
  botonesFoto:{
    flexDirection: 'row',
    justifyContent: "center",
    marginVertical: 10

  },
  imagen:{
    width: "90%",
    height: 300,
    alignSelf: "center",
    marginVertical: 5
  }
})