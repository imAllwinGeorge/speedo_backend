import mongoose from 'mongoose'
import { config } from '../shared/config'

export const connectDB = async() => {
    try {
        const conn = await mongoose.connect(config.MONGO_URL as string)
        console.log("mongo db connected: ", conn.connection.host);
    } catch (error) {
        console.log("mongo db connection error", error)
    }
}