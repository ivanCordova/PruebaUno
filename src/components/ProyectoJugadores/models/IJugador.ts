import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamasList } from '../utils/RootStackParam';
import { ILikes } from './ILikes';
export interface IJugador {
  Id: string;
  Nombre: string;
  Pais: string;
  Edad: number;
  Imagen: string,
  Likes: ILikes[],
  mostrar?: () => void;
  personasLikes?: () => void;
}

export interface IUsuario {
  Usuario: string,
  Contrasenia: string
}