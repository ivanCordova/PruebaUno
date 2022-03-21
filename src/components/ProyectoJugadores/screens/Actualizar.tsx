import { ActivityIndicator, Pressable, StyleSheet, Text, View, Alert, Image, Modal } from 'react-native';
import React, { useEffect, useState, useContext } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamasList } from '../utils/RootStackParam';
import firestore from '@react-native-firebase/firestore';
import { IJugador } from '../models/IJugador';
import { ImageLibraryOptions, ImagePickerResponse, launchCamera, launchImageLibrary } from 'react-native-image-picker';
type Props = StackScreenProps<RootStackParamasList, "Actualizar">;
import Icon from 'react-native-vector-icons/FontAwesome5';
import { contexto } from '../utils/AuthContext';



const Actualizar = ({ navigation, route }: Props) => {
    const { id } = route.params //{id} : toma el id que viene desde Principal
    const [nombre, setNombre] = useState<string>("")
    const [edad, setEdad] = useState<number>(0)
    const [pais, setPais] = useState<string>("")
    const [loading, setloading] = useState(false)
    const [imagen, setImagen] = useState("https://static.vecteezy.com/system/resources/previews/005/232/501/non_2x/photography-flat-outline-showing-capturing-camera-vector.jpg")
    const context = useContext(contexto)


    function like(){
        console.log(context.usuario.Correo)
        firestore()
        .collection("Jugadores")
        .doc(id)
        .collection("Like")
        .add({
          Documento: id,
          Usuario: context.usuario.Correo,
          UserId: context.usuario.UserId
        }).then(() => {
          Alert.alert("Correcto", "Like")
        })
    }

    async function GetJugador() {
        setloading(true)
        const jugadores = firestore()
            .collection("Jugadores")
            .doc(id)
            .get().then((item) => {
                let j = item.data() as IJugador
                setEdad(j.Edad),
                    setNombre(j.Nombre)
                setPais(j.Pais)
                setImagen(j.Imagen)
                setloading(false)
            })
    }

    useEffect(() => {
        GetJugador();
    }, [])

    const actualizar = () => {
        firestore()
            .collection("Jugadores")
            .doc(id)
            .update({
                Nombre: nombre,
                Edad: edad,
                Pais: pais,
                Imagen: imagen
            }).then(() => {
                Alert.alert("Correcto", "Jugador actualizado correctamente")
                navigation.goBack()
            })
    }

    const eliminar = () => {
        Alert.alert("Confirme acción", `¿Esta seguro que desea eliminar?`, [
            {
                text: "Si",
                onPress: () => {
                    firestore()
                        .collection("Jugadores")
                        .doc(id)
                        .delete()
                        .then(() => {
                            Alert.alert("Correcto", "Jugador eliminado correctamente")
                            navigation.goBack()
                        })
                }
            },
            {
                text: "No",
                style: "cancel"
            }
        ])
    }

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

    return (
        <View style={styles.contenedor}>
            <Image style={styles.imagen} source={{ uri: imagen }}></Image>
            <View style={styles.botonesFoto}>
                <Pressable style={styles.botonFoto} onPress={SeleccionarImagenGaleria}>
                    <Text style={styles.textoBoton}>Obtener foto de librería</Text>
                </Pressable>
                <Pressable style={styles.botonFoto} onPress={TomarFotografia}>
                    <Text style={styles.textoBoton}>Abrir camara</Text>
                </Pressable>
            </View>
            <TextInput onChangeText={(e) => setNombre(e)} value={nombre} style={styles.textInput}></TextInput>
            <TextInput onChangeText={(e) => setEdad(parseInt(e))} value={edad.toString()} style={styles.textInput}></TextInput>
            <TextInput onChangeText={(e) => setPais(e)} value={pais} style={styles.textInput}></TextInput>
            {loading ? <ActivityIndicator size={60}></ActivityIndicator> :
                <View style={styles.contenedorBotones}>
                    <Pressable style={styles.boton} onPress={actualizar}>
                        <Text style={styles.textoBoton}>Actualizar</Text>
                    </Pressable>
                    <Pressable style={[styles.boton, { backgroundColor: "green" }]} onPress={eliminar}>
                        <Text style={styles.textoBoton}>Eliminar</Text>
                    </Pressable>
                </View>
            }
        </View>
    )
}

export default Actualizar

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
        width: 100,
        height: 50,
        borderRadius: 10,
        backgroundColor: "#D83F1E",
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
        marginVertical: 5,
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
    }
})