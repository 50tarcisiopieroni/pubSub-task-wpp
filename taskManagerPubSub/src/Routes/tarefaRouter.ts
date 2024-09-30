import { Router } from "express";
import TarefaController from "../controller/tarefaController";
import { ITarefa } from "models/tarefaModel";

const tarefaController = new TarefaController()

const TarefaRotas = Router();

TarefaRotas.get("/", async (req, res) => {
    const listaTarefes = await tarefaController.index();
    return res.json(listaTarefes);
})

TarefaRotas.post("/", async (req, res) => {
    const tarefa:ITarefa = req.body;
    const newTarefa = await tarefaController.save(tarefa);
    return res.json(newTarefa);
})

export default TarefaRotas