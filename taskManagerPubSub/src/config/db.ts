import { connect } from "mongoose"
import { config } from "dotenv"

export const connectMongoDB = async () => {
    config()
    await connect(process.env.MONGODB_CONNECTION_URL)
}
