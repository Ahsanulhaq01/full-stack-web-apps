import express from 'express'
import recipeRouter from './routes/recipes.route.js'
const app = express();

app.use(express.json())
app.use('/public/upload' , express.static('public/upload'))

app.use('/' , recipeRouter)
export {app}