import { Channel, connect, Connection } from "amqplib";
import TarefaController from '../controller/tarefaController'
import { config } from "dotenv";
import { ITarefa } from "models/tarefaModel";


export default class RabbitmqService {
  connection: Connection;
  channel: Channel;
  tarefaController: TarefaController;

  constructor() {
    this.connection = null;
    this.channel = null;
    this.tarefaController = new TarefaController();
  }

  async init() {
    try {
      if (!this.connection) {
        this.connection = await connect(process.env.AMQP_SERVER);
        this.channel = await this.connection.createChannel();
        console.log('Conexão e canal RabbitMQ inicializados');
      }
    } catch (error) {
      console.error('Erro ao conectar ao RabbitMQ:', error);
    }
  }

  async consumeQueue() {
    config()
    try {
      const queue = process.env.QUEUE_MENSAGEM;
      await this.channel.assertQueue(queue, { durable: true });

      console.log(`Aguardando mensagens na fila: ${queue}`);

      this.channel.consume(queue, async (msg) => {
        if (msg !== null) {
          const tarefaNova: ITarefa = JSON.parse(msg.content.toString());
          const tarefaCriada: ITarefa = await this.tarefaController.save(tarefaNova)

          console.log(`Tarefa cadastrada: ${tarefaCriada.titulo}`);
          this.channel.ack(msg);
        }
      });
    } catch (error) {
      console.error('Erro ao consumir a fila:', error);
    }
  }

  async publishMessage(queue: string, tarefa: ITarefa) {
    try {
      const connection = await connect(process.env.AMQP_SERVER);
      const channel = await connection.createChannel();

      await channel.assertQueue(queue, { durable: true });

      channel.sendToQueue(queue, Buffer.from(JSON.stringify(tarefa)));
      console.log(`Mensagem publicada na fila "${queue}": ${tarefa.titulo}`);

      setTimeout(() => {
        connection.close();
      }, 500);
    } catch (error) {
      console.error("Erro ao publicar mensagem:", error);
    }
  }

  fechaConexoes() {
    try {
      if (this.connection) {
        this.channel.close();
        this.connection.close();
      }
      console.log('Conexão e canal RabbitMQ fechados');
    } catch (error) {
      console.error('Erro ao fechar a conexão com RabbitMQ:', error);
    }
  }
}