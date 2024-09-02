import express from 'express';
import userRoutes from './routes/userRoutes'
import { AppDataSource } from './DataSource'

async function starterServer() {
    try {
        await AppDataSource.initialize()

        const app = express()
        const port = 3000

        app.use(express.json())
        app.use('/users', userRoutes)


        app.listen(port, () => {
            console.log(`Servidor rodando em http://localhost:${port}`)
        })
    } catch(e) {
        throw e
    }
}


starterServer()