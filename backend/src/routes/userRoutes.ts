import { Router } from 'express';
import {
  createUser,
  getAllUsers,
  getUsersByRole,
  getUserById,
  updateUser,
  deleteUserById
} from '../controllers/userController';
import { authenticateJWT } from '../middleware/authMiddleware';
import { AppDataSource } from '../DataSource'
import { User } from '../entity/User'
import { Role } from '../entity/Role'

const router = Router();

router.use(authenticateJWT);

// Criar um novo usuário
router.post('/', createUser);

// Listar todos os usuários
router.get('/', async (req, res) => {
  const userRepository = AppDataSource.getRepository(User)
  const users = await userRepository.find({ relations: ['role']})
  res.json({
    data: users
  })
 }) //getAllUsers);

// Listar usuários com papel 'user'
router.get('/role/user', getUsersByRole);

// Obter usuário por ID
router.get('/:id', getUserById);

// Atualizar um usuário
router.put('/:id', updateUser);

// Excluir um usuário
router.delete('/:id', deleteUserById);

export default router;
