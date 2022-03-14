import { Pressable, StyleSheet, Text, View, Alert } from 'react-native';
import React from 'react'
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamasList } from '../utils/RootStackParam';
type Props = StackScreenProps<RootStackParamasList, "Actualizar">;
import auth from '@react-native-firebase/auth';

const Login = ({ navigation }: Props) => {
    const registro = () => {
        auth()
            .createUserWithEmailAndPassword('talivan1602@gmail.com', '123456')
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

    const login = () =>{
        auth().signInWithEmailAndPassword('talivan1602@gmail.com', '123456')
            .then((e) => {
                console.log(e.user.uid)
                navigation.navigate("Principal")
            }).catch(error => {
                Alert.alert("Error", error.code)
            })
    }

    return (
        <View>
            <Pressable style={styles.boton} onPress={login}>
                <Text style={styles.textoBoton}>Iniciar sesión</Text>
            </Pressable>
            <Pressable style={styles.boton} onPress={registro}>
                <Text style={styles.textoBoton}>Registrarse</Text>
            </Pressable>
        </View>
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
        backgroundColor: "green",
        borderColor: "black",
        borderWidth: 2,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 2,
        alignSelf: "center"
    },
})