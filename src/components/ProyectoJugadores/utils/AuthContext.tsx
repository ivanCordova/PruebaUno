import { StyleSheet, Text, View } from 'react-native'
import React, { createContext, useReducer } from 'react'
import { IUsuario } from '../models/IUsuario';
import { OperacionesEnum, reducerOperaciones } from './Reducer';

const UsuarioInicial: IUsuario = {
    Correo: "",
    UserId: ""
}

interface ContextProps {
    usuario: IUsuario,
    IniciarSesion: (user: IUsuario) => void
    CerrarSesion?: () => void
}

export const contexto = createContext<ContextProps>({} as ContextProps)

interface Props {
    children: JSX.Element
}

const AuthContext = ({ children }: Props) => {

    const [state, dispatch] = useReducer(reducerOperaciones, UsuarioInicial)

    const IniciarSesion = (user: IUsuario)=>{
        dispatch({type: OperacionesEnum.Iniciar, payload: user})
    }

    return (
        <contexto.Provider value={{
            usuario:state,
            IniciarSesion
        }}>
            {children}
        </contexto.Provider>
    )
}

export default AuthContext