import express, { urlencoded } from 'express'
import cookieParser from 'cookie-parser'
import recipeRouter from './routes/recipes.route.js'
import userRouter from './routes/user.route.js'
import cors from 'cors'
const app = express();

app.use(express.json())
app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}));
app.use(cookieParser())
app.use('/public/upload' , express.static('public/upload'))
app.use(express.urlencoded())
app.use('/api/v1/recipes' , recipeRouter)
app.use('/api/v1/user' , userRouter);
export {app} 