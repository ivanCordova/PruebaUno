import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useReducer } from 'react'

const EjemploUseReducer = () => {
    /* Paso 1: Definición del state */
    type OperacionState = {
        n1: number,
        n2: number,
        res?: number
    }
    // Paso 2: Definir valor inicial 
    const initialOperacionesState: OperacionState = {
        n1: 0,
        n2: 0,
        res: 0
    }
    //Paso 3: Definir acciones 
    type OperacionesAcciones = {
        type: "SUMAR" | "RESTAR" | "MULTIPLICAR" | "DIVIDIR"
    }

    enum OperacionesEnum {
        Sumar = "SUMAR",
        Restar = "RESTAR",
        Multiplicar = "MULTIPLICAR",
        Dividir = "DIVIDIR"
    }

    type Acciones = {
        type: OperacionesEnum,
        payload: OperacionState //
    }

    function reducerOperaciones(state: OperacionState, action: Acciones): OperacionState {
        switch (action.type) {
            case OperacionesEnum.Sumar:
                return {
                    n1: action.payload.n1,
                    n2: action.payload.n2,
                    res: action.payload.n1 + action.payload.n2
                }
            case OperacionesEnum.Restar:
                return {
                    n1: action.payload.n1,
                    n2: action.payload.n2,
                    res: action.payload.n1 - action.payload.n2
                }
            case OperacionesEnum.Multiplicar:
                return {
                    n1: action.payload.n1,
                    n2: action.payload.n2,
                    res: action.payload.n1 * action.payload.n2
                }
            case OperacionesEnum.Dividir:
                return {
                    n1: action.payload.n1,
                    n2: action.payload.n2,
                    res: action.payload.n2 !== 0 ? action.payload.n1 / action.payload.n2 : 0
                }
            default:
                return state
        }
    }

    const [state, dispatch] = useReducer(reducerOperaciones, initialOperacionesState)
    function operacion(){
        const n1 = Math.floor(Math.random() * 100)
        const n2 = Math.floor(Math.random() * 100)
        console.log(n1)        
        console.log(n2)
        dispatch({type: OperacionesEnum.Sumar, payload: {n1,n2}})
        console.log(state)
    }
    
    useEffect(() => {
        operacion();
    }, [])
    

    return (
        <View>
            <Text>EjemploUseReducer</Text>
        </View>
    )
}

export default EjemploUseReducer

const styles = StyleSheet.create({})