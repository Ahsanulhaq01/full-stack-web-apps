import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

async function connectDB() {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}${DB_NAME}`)
        console.log(`DB connected SuccessFully ! hostname ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log(`Db connection failed ${error}`)
    }
}

export {connectDB};