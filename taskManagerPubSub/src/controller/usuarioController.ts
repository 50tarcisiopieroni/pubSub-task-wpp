import { IUsuario, UsuarioModel } from "../models/usuarioModel";

export default class UsuarioController {

    async save(usuario: IUsuario) : Promise<IUsuario> {
        const newUsuario = await UsuarioModel.create(usuario);
        return newUsuario;
    }

    async index() : Promise<IUsuario[]> {
        const allUsuario = await UsuarioModel.find();
        return allUsuario;
    }
}