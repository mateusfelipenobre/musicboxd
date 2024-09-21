import express from 'express';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import roleRoutes from './routes/roleRoutes';
import reviewRoutes from './routes/reviewRoutes'; // Adicionando rotas de críticas
import cors from "cors";
import { AppDataSource } from './DataSource';

async function startServer() {
  try {
    await AppDataSource.initialize();
    
    const app = express();
    const port = 3000;

    app.use(cors());
    app.use(express.json());

    app.use('/', authRoutes);
    app.use('/users', userRoutes);
    app.use('/roles', roleRoutes);
    app.use('/reviews', reviewRoutes); // Adicionando a rota de críticas
    
    app.listen(port, () => {
      console.log(`Servidor escutando a porta ${port} em http://localhost:${port}`);
    });
  } catch (e) {
    console.error('Erro ao iniciar o servidor:', e);
    throw e;
  }
}

startServer();
