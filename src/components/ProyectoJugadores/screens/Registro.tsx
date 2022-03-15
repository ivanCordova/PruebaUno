import { Pressable, StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import React, { Fragment, useState } from 'react'
import * as Yup from 'yup';
import { IUsuario } from '../models/IJugador';
import { ScrollView } from 'react-native-gesture-handler';
import { Formik } from 'formik';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamasList } from '../utils/RootStackParam';
type Props = StackScreenProps<RootStackParamasList>;


const Registro = ({ navigation }: Props) => {
    const usuarioInicial: IUsuario = {
        Usuario: "",
        Contrasenia: ""
    }
    const [usuario, setUsuario] = useState(usuarioInicial)
    const validacion = Yup.object({
        Usuario: Yup.string().required("El usuario es requerido"),
        Contrasenia: Yup.string().required("La contraseña es requerida")
    })

    const registro = (usr: IUsuario) => {
        auth()
            .createUserWithEmailAndPassword(usr.Usuario, usr.Contrasenia) // 'talivan1602@gmail.com', '123456'
            .then(() => {
                Alert.alert("Correcto", "Usuario registrado correctamente")
                navigation.goBack()
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    Alert.alert("Error", "El email ya esta en uso")
                }

                if (error.code === 'auth/invalid-email') {
                    Alert.alert("Error", "El email no es valido")
                }
            });
    }

    return (
        <ScrollView>
            <Formik initialValues={usuario} onSubmit={valores => registro(valores)} validationSchema={validacion}>
                {({ values, handleChange, errors, setFieldTouched, handleSubmit }) => (
                    <Fragment>
                        <Icon style={styles.icon} name="user-plus" size={200} color="orange" />
                        <TextInput
                            placeholder='Usuario'
                            style={styles.textInput}
                            onChangeText={handleChange("Usuario")}
                            onBlur={() => setFieldTouched("Usuario")}
                        ></TextInput>
                        {errors.Usuario && <Text style={styles.textoError}>{errors.Usuario}</Text>}
                        <TextInput
                            secureTextEntry={true}
                            placeholder='Contraseña'
                            style={styles.textInput}
                            onChangeText={handleChange("Contrasenia")}
                            onBlur={() => setFieldTouched("Contrasenia")}
                        ></TextInput>
                        {errors.Contrasenia && <Text style={styles.textoError}>{errors.Contrasenia}</Text>}
                        <Pressable style={styles.boton} onPress={handleSubmit}>
                            <Text style={styles.textoBoton}>Registrarse</Text>
                        </Pressable>
                    </Fragment>
                )}
            </Formik>
        </ScrollView>
    )
}

export default Registro

const styles = StyleSheet.create({
    textoBoton: {
        fontSize: 15,
        color: "white",
        fontWeight: "bold"
    }, boton: {
        width: "80%",
        height: 50,
        borderRadius: 10,
        backgroundColor: "orange",
        borderColor: "black",
        borderWidth: 2,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 5,
        alignSelf: "center"
    },
    textInput: {
        marginVertical: 10,
        borderWidth: 2,
        borderColor: "black",
        marginHorizontal: 15,
        borderRadius: 15,
        paddingLeft: 20,
        fontSize: 15,
        backgroundColor: "white"
    },
    textoError: {
        backgroundColor: "red",
        color: "white",
        marginHorizontal: 15,
        padding: 10,
        borderRadius: 15,
        fontSize: 15
    },
    icon: {
        alignSelf: "center",
        marginVertical: 20
    }

})