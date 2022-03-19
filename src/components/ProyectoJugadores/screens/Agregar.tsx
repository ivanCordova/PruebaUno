import { Alert, Image, Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import React, { Fragment, useState } from 'react'
import { IJugador } from '../models/IJugador';
import { ImageLibraryOptions, ImagePickerResponse, launchImageLibrary, launchCamera } from 'react-native-image-picker';
import * as Yup from 'yup'
import { Formik } from 'formik';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import storage from '@react-native-firebase/storage'

const Agregar = () => {

  async function SeleccionarImagenGaleria() {
    let opciones: ImageLibraryOptions = {
      mediaType: 'photo'
    };
    const result: ImagePickerResponse = await launchImageLibrary(opciones)
    if (result.assets) {
      const url = result.assets[0].uri;
      setImagen(url!)// El signo ! indica que no sera indefinido
    }
  }

  async function TomarFotografia() {
    let opciones: ImageLibraryOptions = {
      mediaType: 'photo'
    };
    const result: ImagePickerResponse = await launchCamera(opciones)
    if (result.assets) {
      const url = result.assets[0].uri;
      setImagen(url!)// El signo ! indica que no sera indefinido
    }
  }

  const SubirImagen = async (j: IJugador) => {
    const nombreArchivo = imagen.substring(imagen.lastIndexOf("/") + 1)
    const uploadUri = Platform.OS == "ios" ? imagen.replace("file://", "") : imagen
    const referencia = storage().ref(nombreArchivo)
    const task = referencia.putFile(uploadUri);

    task.on('state_changed', taskSnapshot => {
      console.log(`Bytes trasferidos: ${taskSnapshot.bytesTransferred} de: 
       transferred out of ${taskSnapshot.totalBytes}`);
    });

    task.then(async () => {
      const link = await storage().ref(nombreArchivo).getDownloadURL()
      //console.log("Link: "+link)
      firestore()
        .collection("Jugadores")
        .add({
          Nombre: j.Nombre,
          Edad: j.Edad,
          Pais: j.Pais,
          Imagen: link
        }).then(() => {
          Alert.alert("Correcto", "Jugador agregado correctamente")
        })
    })

  }

  const jugadorInicial: IJugador = {
    Edad: 0,
    Id: "",
    Imagen: "",
    Nombre: "",
    Pais: ""
  }

  const [imagen, setImagen] = useState<string>("https://static.vecteezy.com/system/resources/previews/005/232/501/non_2x/photography-flat-outline-showing-capturing-camera-vector.jpg")
  const [jugador, setJugador] = useState<IJugador>(jugadorInicial)
  const [uploading, setUploading] = useState(false)

  const validaciones = Yup.object({
    Nombre: Yup.string().required("El nombre es requerido").max(150, "No debe pasar de 150 caracteres"),
    Edad: Yup.number().typeError("Solo se aceptan numeros").required("La edad es requerida"),
    Pais: Yup.string().required("El pais es requerido")
  })


  return (
    <ScrollView>
      <Formik initialValues={jugador} onSubmit={async valores => SubirImagen(valores)} validationSchema={validaciones}>
        {({ values, handleChange, errors, setFieldTouched, handleSubmit }) => (
          <Fragment>
            <Text style={styles.texto}>Nombre</Text>
            <TextInput style={styles.textInput}
              onChangeText={handleChange("Nombre")}
              onBlur={() => setFieldTouched("Nombre")}
              placeholder="Nombre del jugador"
            ></TextInput>
            {errors.Nombre &&
              <Text style={styles.textoError}>{errors.Nombre}</Text>}

            <Text style={styles.texto}>Edad</Text>
            <TextInput style={styles.textInput}
              onChangeText={handleChange("Edad")}
              onBlur={() => setFieldTouched("Edad")}
              placeholder="Edad del jugador"
              keyboardType='numeric'
            ></TextInput>
            {errors.Edad &&
              <Text style={styles.textoError}>{errors.Edad}</Text>}

            <Text style={styles.texto}>País</Text>
            <TextInput style={styles.textInput}
              onChangeText={handleChange("Pais")}
              onBlur={() => setFieldTouched("Pais")}
              placeholder="Pais del jugador"
            ></TextInput>
            {errors.Pais &&
              <Text style={styles.textoError}>{errors.Pais}</Text>}

            <View style={{ flexDirection: "row" }}>
              <Pressable style={[styles.boton, { width: "48%" }]} onPress={SeleccionarImagenGaleria}>
                <Text style={styles.textoBoton}>Obtener foto de librería</Text>
              </Pressable>
              <Pressable style={[styles.boton, { width: "48%" }]} onPress={TomarFotografia}>
                <Text style={styles.textoBoton}>Abrir camara</Text>
              </Pressable>
            </View>
            <Image source={{ uri: imagen }} style={styles.imagen} />
            <Pressable style={[styles.boton, { alignSelf: "center" }]} onPress={handleSubmit}>
              <Text style={styles.textoBoton}>Agregar</Text>
            </Pressable>

          </Fragment>
        )}

      </Formik>
    </ScrollView>
  )
}

export default Agregar

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
  botonesFoto: {
    flexDirection: 'row',
    justifyContent: "center",
    marginVertical: 10

  },
  imagen: {
    width: "90%",
    height: 300,
    alignSelf: "center",
    marginVertical: 5
  },
  texto: {
    fontSize: 20
  }, 
  textoError: {
    backgroundColor: "red",
    color: "white",
    marginHorizontal: 15,
    padding: 10,
    borderRadius: 15,
    fontSize: 15
  },
})