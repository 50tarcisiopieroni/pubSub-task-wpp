import { Document, Schema, model } from "mongoose";
import { IUsuario } from "./usuarioModel";

export interface ITarefa extends Document {
    titulo: String;
    diaSemana: Number;
    usuario: IUsuario['_id'];
    concluida: Boolean;
}

const schema = new Schema<ITarefa>({
    titulo: { type: String, required:true},
    diaSemana: { type: Number, required:true},
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
    concluida: {type : Boolean}
})

export const TarefaModel = model<ITarefa>("tarefa",schema)