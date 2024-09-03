import { Router } from 'express'
import { AppDataSource } from '../DataSource'
import { User } from '../entity/User'
import { Role } from '../entity/Role'
import { authenticateJWT } from '../middleware/authMiddleware'
import bcrypt from 'bcryptjs'

const router = Router()

//router.use(authenticateJWT)

router.post('/', async (req, res) => {
  const { name, username, email, password, role } = req.body

  if(!name || !username || !email || !password || !role) {
    return res.status(400).json({
      error: {
        status: 400,
        name: 'Validation error',
        message: 'You missed a required field'
      }
    })
  }

  const userRepository = AppDataSource.getRepository(User)
  const roleRepositoy = AppDataSource.getRepository(Role)

  let roleInDB = await roleRepositoy.findOne({ where: { name: role }})

  if(!roleInDB) {
    roleInDB = roleRepositoy.create({ name: role })
    await roleRepositoy.save(roleInDB)
  }

  const hashedPassword = bcrypt.hashSync(password, 10)

  const newUser: User = userRepository.create({
    name,
    username,
    email,
    password: hashedPassword,
    role: roleInDB
  })

  await userRepository.save(newUser)
  res.status(200).json({
    data: newUser
  })
})

router.get('/', async (req, res) => {
  const userRepository = AppDataSource.getRepository(User)
  const users = await userRepository.find({ relations: ['role']})
  res.json({
    data: users
  })
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const userRepository = AppDataSource.getRepository(User)
  const user = await userRepository.findOne({
    where: {
      id: parseInt(id)
    }, 
    relations: ['role']
  })

  if(!user) {
    return res.status(404).json({
      error: {
        status: 404,
        name: 'NotFound',
        message: 'User not found'
      }
    })
  }

  res.json({
    data: user
  })
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { name, username, email, password, role } = req.body

  const userRepository = AppDataSource.getRepository(User)
  const roleRepositoy = AppDataSource.getRepository(Role)

  const user = await userRepository.findOne({
    where: {
      id: parseInt(id)
    }, 
    relations: ['role']
  })

  if(!user) {
      return res.status(404).json({
        error: {
          status: 404,
          name: 'NotFound',
          message: 'User not found'
        }
      })
  }

  let roleInDB = await roleRepositoy.findOne({ where: { name: role }})

  if(!roleInDB) {
    roleInDB = roleRepositoy.create({ name: role })
    await roleRepositoy.save(roleInDB)
  }
  

  
  user.name = name || user.name
  user.username = username || user.username
  user.email = email || user.email
  user.password = password || user.password
  user.role = roleInDB

  userRepository.save(user)
  res.status(200).json({
    data: user
  })
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  const userRepository = AppDataSource.getRepository(User)
  const user = await userRepository.findOne({
    where: {
      id: parseInt(id)
    }, 
    relations: ['role']
  })

  if(!user) {
    return res.status(404).json({
      error: {
        status: 404,
        name: 'NotFound',
        message: 'User not found'
      }
    })
  }

  userRepository.remove(user)
  res.status(200).json({
    data: user
  })
})




export default router