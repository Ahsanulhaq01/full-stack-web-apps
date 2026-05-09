import express, { urlencoded } from 'express'
import recipeRouter from './routes/recipes.route.js'
import cors from 'cors'
const app = express();

app.use(express.json())
app.use(cors());
app.use('/public/upload' , express.static('public/upload'))
app.use(express.urlencoded())
app.use('/api/v1/recipes' , recipeRouter)
export {app}