export interface IJugador {
  Id: string;
  Nombre: string;
  Pais: string;
  Edad: number;
  Imagen: string,
  mostrar?: () => void;
}

export interface IUsuario {
  Usuario: string,
  Contrasenia: string
}