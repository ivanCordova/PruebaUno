import PersonasLikes from '../screens/PersonasLikes';
import { ILikes } from '../models/ILikes';
import { IJugador } from '../models/IJugador';
export type RootStackParamasList ={
    Agregar : undefined,
    Principal: undefined,
    Actualizar: {id: string},
    Foto: undefined,
    Login: undefined,
    Registro: undefined,
    EjemploUseReducer: undefined,
    PersonasLikes: {id: string}
}