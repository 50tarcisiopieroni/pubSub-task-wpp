
import { config } from "dotenv";
import RabbitmqService from "./services/rabbitmqService";

const openServer = async () => {
    config();
    
    const coelho = new RabbitmqService();
    await coelho.init();
    await coelho.consumeQueue();
    
    process.on('SIGINT', async () => {
        coelho.fechaConexoes();
    })
}

openServer();