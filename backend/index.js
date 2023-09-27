import express from 'express';
import { PORT, MONGODB_URL } from './config.js'
import mongoose from 'mongoose';
import taskRoutes from './routes/tasksRoutes.js'
import cors from 'cors';

const app = express();

app.use(express.json()) 
app.use(cors())

app.get('/', (req, res) => {
    console.log(req)
    return res.status(234).send('WELCOME')
})

app.use ('/tasks', taskRoutes)

mongoose
    .connect(MONGODB_URL)
    .then(() => {
        console.log('App connected to database')
        app.listen(PORT, () => {
            console.log(`App is listening to localhost:${PORT}`)
        })
    }) 
    .catch((error) => {
        console.log(error)
    })