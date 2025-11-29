import dotenv from 'dotenv';
import { connectDB } from './db/index.js';
import { app } from './app.js';

dotenv.config();

connectDB().then(()=>{
    app.on('error',()=>{
        console.log("erro while connecting to db")
    });
    app.listen(process.env.PORT||4000 , () =>{
        console.log(`server is listening on Port ${process.env.PORT}`)
    })
}).catch((error)=>{
    console.log(`db connection get faild ${error}`)
});
