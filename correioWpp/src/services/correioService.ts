import axios, { AxiosError } from "axios";
import { config } from "dotenv";
import { ITarefa } from "model/tarefa";

interface ErrorResponse {
    message: string;
    statusCode: number;
}

function getMensageUrl(tarefa: ITarefa) {
    config()

    let text: string;
    if(tarefa.concluida){
        text = `✅ Tarefa *${tarefa.titulo}* foi concluida pelo usuario *${tarefa.usuario.nome}*`
    
    }else{
        text = `*ℹ️ Nova tarefa foi vinculada a você:*\n\n📎${tarefa.titulo}`
    }
    let phone = `55${tarefa.usuario.wppNumero}`

    const parametros = `phone=${phone}&text=${text}&apikey=${tarefa.usuario.apiKey}`;

    return encodeURI(process.env.CALLMEBOT_URL + parametros)
}

export async function enviarMensagem(tarefa: ITarefa) {

    try {
        const response = await axios.get(getMensageUrl(tarefa))
        console.log(response.data);
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;

        if (axiosError.response) {
            console.error('Erro:', axiosError.response.data.message);
            console.error('Status Code:', axiosError.response.data.statusCode);
        } else {
            console.error('Erro sem resposta:', axiosError.message);
        }
    }
}
