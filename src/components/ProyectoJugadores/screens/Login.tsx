import { Pressable, StyleSheet, Text, View, Alert } from 'react-native';
import React, { Fragment, useContext, useState } from 'react'
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamasList } from '../utils/RootStackParam';
type Props = StackScreenProps<RootStackParamasList, "Actualizar">;
import auth from '@react-native-firebase/auth';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { IUsuario } from '../models/IJugador';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { contexto } from '../utils/AuthContext'


const Login = ({ navigation }: Props) => {

    const usuarioInicial: IUsuario = {
        Usuario: "",
        Contrasenia: ""
    }
    const [usuario, setUsuario] = useState(usuarioInicial)
    const validacion = Yup.object({
        Usuario: Yup.string().required("El usuario es requerido"),
        Contrasenia: Yup.string().required("La contraseña es requerida")
    })

    const context = useContext(contexto)

    const registro = () => {
        auth()
            .createUserWithEmailAndPassword("", "") // 'talivan1602@gmail.com', '123456'
            .then(() => {
                console.log('User account created & signed in!');
            })
            .catch(error => {
                /*                 if (error.code === 'auth/email-already-in-use') {
                                    console.log('That email address is already in use!');
                                }
                
                                if (error.code === 'auth/invalid-email') {
                                    console.log('That email address is invalid!');
                                }
                 */
                console.error(error);
            });
    }



    const login = (usr: IUsuario) => {
        auth().signInWithEmailAndPassword(usr.Usuario, usr.Contrasenia)
            .then((e) => {
                console.log(e.user.uid)
                context.IniciarSesion({Correo: usr.Usuario, UserId: e.user.uid})
                navigation.navigate("Principal")
            }).catch(error => {
                Alert.alert("Error", error.code)
            })
    }

    return (
        <ScrollView>
            <Formik initialValues={usuario} onSubmit={valores => login(valores)} validationSchema={validacion}>
                {({ values, handleChange, errors, setFieldTouched, handleSubmit }) => (
                    <Fragment>
                        <Icon style={styles.icon} name="user" size={200} color="orange" />
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
                            <Text style={styles.textoBoton}>Iniciar sesión</Text>
                        </Pressable>
                    </Fragment>
                )}
            </Formik>
            <Pressable style={styles.boton} onPress={() => navigation.navigate("Registro")}>
                <Text style={styles.textoBoton}>Registrarse</Text>
            </Pressable>
        </ScrollView>
    )
}

export default Login

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