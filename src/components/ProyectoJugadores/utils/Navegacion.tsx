import { Alert, Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Principal from '../screens/Principal';
import Agregar from '../screens/Agregar';
import Actualizar from '../screens/Actualizar';
import Foto from '../screens/Foto';
import Login from '../screens/Login';
import auth from '@react-native-firebase/auth';
import Registro from '../screens/Registro';
import EjemploUseReducer from '../screens/EjemploUseReducer';
import AuthContext from './AuthContext';
import PersonasLikes from '../screens/PersonasLikes';

const Navegacion = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <AuthContext>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name='Principal' component={Principal} options={{ headerStyle: { backgroundColor: "orange" } }}></Stack.Screen>
          <Stack.Screen name='Agregar' component={Agregar}></Stack.Screen>
          <Stack.Screen name='Actualizar' component={Actualizar}></Stack.Screen>
          <Stack.Screen name='Foto' component={Foto}></Stack.Screen>
          <Stack.Screen name='EjemploReducer' component={EjemploUseReducer}></Stack.Screen>
          <Stack.Screen name='Login' component={Login}></Stack.Screen>
          <Stack.Screen name='Registro' component={Registro}></Stack.Screen>
          <Stack.Screen name='PersonasLikes' component={PersonasLikes}></Stack.Screen>
        </Stack.Navigator>
      </AuthContext>
    </NavigationContainer>
  )
}

export default Navegacion

const styles = StyleSheet.create({})