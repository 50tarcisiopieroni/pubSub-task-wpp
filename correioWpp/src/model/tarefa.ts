import Usuario from "./usuario";

export interface ITarefa {
    titulo: String;
    diaSemana: Number;
    usuario: Usuario;
    concluida: Boolean;
}