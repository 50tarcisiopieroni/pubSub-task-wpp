import { Router } from "express";
import TarefaController from "../controller/tarefaController";
import { ITarefa } from "models/tarefaModel";
import RabbitmqService from "../services/rabbitmqService";
import e = require("express");

const tarefaController = new TarefaController()
const coelho = new RabbitmqService();

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

TarefaRotas.post("/concluir/:idTarefa", async (req, res) => {
    const { idTarefa } = req.params;

    if (idTarefa) {
        const tarefaConcluida = await tarefaController.concluiTarefa(idTarefa);
        if (tarefaConcluida){
            await coelho.publishMessage(process.env.QUEUE_CORREIO, tarefaConcluida);
            return res.json({msg:"Tarefa concluida", tarefaConcluida});
        } else {
            res.status(304);
            return res.json("Tarefa não localizada ou já finalizada");
        }
    }
    return res.json("Ops! Não foi possível concuncluir essa tarefa")

})

export default TarefaRotas