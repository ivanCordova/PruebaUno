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

const Navegacion = () => {
    const Stack = createStackNavigator();
  
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Login'>
                <Stack.Screen name='Principal' component={Principal} options={{headerStyle:{backgroundColor:"orange"}, headerRight: () => (
            <Button 
              onPress={() => (auth().signOut().then(() => console.log('User signed out!')))}
              title="out"
              color={"green"}
            />
          )}}></Stack.Screen>
                <Stack.Screen name='Agregar' component={Agregar}></Stack.Screen>
                <Stack.Screen name='Actualizar' component={Actualizar}></Stack.Screen>
                <Stack.Screen name='Foto' component={Foto}></Stack.Screen>
                <Stack.Screen name='Login' component={Login}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
  )
}

export default Navegacion

const styles = StyleSheet.create({})