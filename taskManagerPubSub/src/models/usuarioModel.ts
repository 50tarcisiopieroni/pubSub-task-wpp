import { Document, Schema, model } from "mongoose";

export interface IUsuario extends Document{
    nome: String;
    wppNumero: Number;
    apiKey: Number;
}

const schema = new Schema<IUsuario>({
    nome: { type:String, required:true},
    wppNumero: { type:Number, required:true},
    apiKey: { type:Number, required:true},
})

export const UsuarioModel = model<IUsuario>('Usuario', schema)