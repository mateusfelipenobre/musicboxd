import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../DataSource';
import { User } from '../entity/User';

const router = Router();

// POST /login - Autenticação do usuário
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({
    where: { username: username },
    relations: ['role'],
  });

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign(
      {
        userId: user.id,
        userRole: user.role,
      },
      'meu_segredo_mais_importante', // Substitua por uma variável de ambiente para maior segurança
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      data: {
        user: {
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
          role: {
            id: user.role.id,
            name: user.role.name,
          },
        },
        jwt: token, // Envia o token JWT
      },
    });
  } else {
    return res.status(401).json({
      status: 401,
      name: 'Authorization Error',
      message: 'Username or Password invalid',
    });
  }
});

// GET /logout - Simula um logout
router.get('/logout', (req, res) => {
  res.status(200).json({
    data: {
      message: 'Logout realizado com sucesso',
    },
  });
});
export default router;
