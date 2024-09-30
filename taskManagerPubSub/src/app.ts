import * as express from 'express';
import * as cors from 'cors';
import UsuarioRotas from './Routes/usuarioRouter';
import TarefaRotas from './Routes/tarefaRouter';


export const app = express();
app.use(cors());
app.use(express.json());

app.use("/usuario", UsuarioRotas);
app.use("/tarefa", TarefaRotas);