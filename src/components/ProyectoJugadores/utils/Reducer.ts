import { IUsuario } from '../models/IUsuario';
export enum OperacionesEnum{
    Iniciar = "INICIAR",
    Cerrar = "CERRAR"
}

type Actions ={
    type: OperacionesEnum,
    payload: IUsuario
}

export function reducerOperaciones(state: IUsuario, action: Actions): IUsuario{
    const { type, payload} = action
    switch (type) {
        case OperacionesEnum.Iniciar:
            return {
                UserId: payload.UserId,
                Correo: payload.Correo
            }
            break;
            
        default:
            return state;
    }
}