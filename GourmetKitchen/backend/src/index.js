import dotenv from 'dotenv';
import { connectDB } from './db/index.js';
import { app } from './app.js';

dotenv.config()

connectDB().then(()=>{
    app.on('error' , ()=>{
        console.log("get error while connecting to DB")
    })
    app.listen(process.env.PORT || 3000 , ()=>{
        console.log(`server is listening on port ${process.env.PORT} `)
    })
}).catch((error)=>{
    console.log(`DB connection get failed ${error}`)
})
