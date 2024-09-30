import { ITarefa, TarefaModel } from "../models/tarefaModel";

export default class TarefaController {

    async save(tarefa: ITarefa) : Promise<ITarefa> {
        const newTarefa = await TarefaModel.create(tarefa);
        return newTarefa;
    }

    async index() : Promise<ITarefa[]> {
        const allTarefa = await TarefaModel
        .find()
        .populate('usuario')
        .exec()
        return allTarefa;
    }
}