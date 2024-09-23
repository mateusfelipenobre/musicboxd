import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';
import { Role } from '../entity/Role';
import bcrypt from 'bcryptjs';
import { AppDataSource } from '../DataSource'
// Função para buscar usuários do tipo 'user'
export const getUsersByRole = async (req: Request, res: Response) => {
  console.log("uuiiiii2");
  const userRepository = AppDataSource.getRepository(User);
  console.log("uuiiiii");
  try {
    const users = await userRepository.find({
      where: { role: { name: 'user' } },
      relations: ['role'],
    });
    console.log("data", users);
    res.json({ data: users });
    console.log("res", res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar usuários' });
  }
};

// Função para excluir um usuário
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userRepository = AppDataSource.getRepository(User);
  try {
    const user = await userRepository.findOne({ where: { id: Number(id) } });
    if (user) {
      await userRepository.remove(user);
      res.status(200).json({ message: 'Usuário excluído com sucesso' });
    } else {
      res.status(404).json({ message: 'Usuário não encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao excluir usuário' });
  }
};

// Função para criar um novo usuário
export const createUser = async (req: Request, res: Response) => {
  const { name, username, email, password, role } = req.body;

  if (!name || !username || !email || !password || !role) {
    return res.status(400).json({
      error: { status: 400, name: 'ValidationError', message: 'Campos faltando' },
    });
  }

  const userRepository = AppDataSource.getRepository(User);
  const roleRepository = AppDataSource.getRepository(Role);

  try {
    const roleInDB = await roleRepository.findOne({ where: { id: Number(role) } });
    if (!roleInDB) {
      return res.status(400).json({ error: { name: 'InvalidRole', message: 'Papel inválido' } });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = userRepository.create({
      name,
      username,
      email,
      password: hashedPassword,
      role: roleInDB,
    });

    await userRepository.save(newUser);
    res.status(201).json({ data: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar usuário' });
  }
};

// Função para listar todos os usuários
export const getAllUsers = async (req: Request, res: Response) => {
  console.log("deu certo3");
  const userRepository = AppDataSource.getRepository(User);
  console.log("deu certo2");
  try {
    console.log("deu certo1");
    const users = await userRepository.find({ relations: ['role'] });
    console.log("deu certo");
    res.json({ data: users });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar usuários' });
  }
};

// Função para obter um usuário por ID
export const getUserById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: { name: 'InvalidId', message: 'O ID deve ser um número' } });
  }

  const userRepository = AppDataSource.getRepository(User);
  try {
    const user = await userRepository.findOne({ where: { id }, relations: ['role'] });
    if (!user) {
      return res.status(404).json({ error: { name: 'NotFound', message: 'Usuário não encontrado' } });
    }
    res.json({ data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar usuário' });
  }
};

// Função para atualizar um usuário
export const updateUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name, username, email, password, role } = req.body;

  if (isNaN(id)) {
    return res.status(400).json({ error: { name: 'InvalidId', message: 'O ID deve ser um número' } });
  }

  const userRepository = AppDataSource.getRepository(User);
  const roleRepository = AppDataSource.getRepository(Role);

  try {
    const user = await userRepository.findOne({ where: { id }, relations: ['role'] });
    if (!user) {
      return res.status(404).json({ error: { name: 'NotFound', message: 'Usuário não encontrado' } });
    }

    const roleInDB = await roleRepository.findOne({ where: { id: Number(role) } });
    if (!roleInDB) {
      return res.status(400).json({ error: { name: 'InvalidRole', message: 'Papel inválido' } });
    }

    user.name = name || user.name;
    user.username = username || user.username;
    user.email = email || user.email;
    user.password = password ? bcrypt.hashSync(password, 10) : user.password;
    user.role = roleInDB;

    await userRepository.save(user);
    res.status(200).json({ data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar usuário' });
  }
};

// Função para excluir um usuário por ID
export const deleteUserById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: { name: 'InvalidId', message: 'O ID deve ser um número' } });
  }

  const userRepository = AppDataSource.getRepository(User);
  try {
    const user = await userRepository.findOne({ where: { id }, relations: ['role'] });
    if (!user) {
      return res.status(404).json({ error: { name: 'NotFound', message: 'Usuário não encontrado' } });
    }

    await userRepository.remove(user);
    res.status(200).json({ message: 'Usuário excluído com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao excluir usuário' });
  }
};
