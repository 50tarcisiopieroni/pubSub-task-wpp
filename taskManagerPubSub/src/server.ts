import { config } from "dotenv";
import { app } from "./app";
import { connectMongoDB } from "./config/db";
import { connection } from "mongoose";
import RabbitmqService from "./services/rabbitmqService";

const createServer = async () => {
    config()
    const coelho = new RabbitmqService();
    await coelho.init();

    await connectMongoDB()
    const PORT = process.env.PORT
    const server = app.listen(PORT, async () => {
        console.log(`Aplicação rodando na porta ${PORT}`)
        await coelho.consumeQueue();
    })

    process.on('SIGINT', async ()=>{
        await connection.close();
        server.close();
        coelho.fechaConexoes();
        console.log("Conexão da aplicação e do servidor foram fechadas");
    })
}

createServer()