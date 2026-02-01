import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import userRouter from './routes/user.route.js'
import recipeRouter from './routes/recipe.route.js';


const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json({ limit: '16kb' }))
app.use(express.static('public'));
app.use(express.urlencoded({ limit: '10kb' }))

app.use("/api/v1/user", userRouter);
app.use("/api/v1/recipe", recipeRouter);
export { app };