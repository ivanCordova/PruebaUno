import { Image, ImagePickerResult, Platform, Pressable, StyleSheet, Text, View, Alert } from 'react-native';
import { ImageLibraryOptions, ImagePickerResponse, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage'
import React, { useState } from 'react'

const Foto = () => {

  const [imagen, setImagen] = useState<string>("https://static.vecteezy.com/system/resources/previews/005/232/501/non_2x/photography-flat-outline-showing-capturing-camera-vector.jpg")

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
      console.log("Link: "+link)
      Alert.alert("Listo","Archivo cargado correctamente")
    })

  }

  return (
    <View style={styles.contenedor}>
      <View style={{ flexDirection: "row" }}>
        <Pressable style={[styles.boton, { width: "48%" }]} onPress={SeleccionarImagenGaleria}>
          <Text style={styles.textoBoton}>Obtener foto de librería</Text>
        </Pressable>
        <Pressable style={[styles.boton, { width: "48%" }]} onPress={TomarFotografia}>
          <Text style={styles.textoBoton}>Abrir camara</Text>
        </Pressable>
      </View>
      <Image source={{ uri: imagen  }} style={styles.imagen} />
      <Pressable style={styles.boton} onPress={SubirImagen}>
        <Text style={styles.textoBoton}>Subir a storage</Text>
      </Pressable>
    </View>
  )
}

export default Foto

const styles = StyleSheet.create({
  contenedor: {
    flex: 1
  },
  boton: {
    width: "90%",
    height: 50,
    borderRadius: 10,
    backgroundColor: "green",
    borderColor: "black",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 2,
    alignSelf: "center",
    marginVertical: 10
  },
  textoBoton: {
    fontSize: 15,
    color: "white",
    fontWeight: "bold"
  },
  imagen: {
    width: "90%",
    height: 300,
    alignSelf: "center"
  }
})