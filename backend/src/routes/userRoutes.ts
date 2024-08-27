import { Router } from 'express'
import { User } from '../entity/User'

const router = Router()



 const users: User [] = []

 router.post('/', (req, res) => {
    const {name, username, email, password, role} =req.body 

    if(!name || !username || !email || !password || !role ){
      return res.status(400).json({
         error: {
            status:400,
            name: 'Erro de validação',
            message:'You missed'
         }
      })
    }

    const newUser: User = {
      id: users.length +1,
      name,
      username,
      email,
      password,
      role
    }

    users.push(newUser)
    res.status(200).json({
      data: newUser
    })
 }) 

 router.get('/', (req, res) => {
   res.json({
      data: users
   })
 })
 router.get('/:id', (req, res) => {
   const { id } = req.params
   const user = users.find(u => u.id === parseInt(id))

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
      data:user
   })

 })

router.put('/:id', (req, res) => {
   const { id } = req.params
   const { name, username, email, password, role} = req.body
   
   const userIndex = users.findIndex(u => u.id === parseInt(id))

   if(userIndex === -1) {
      return res.status(404).json({
         error: {
            status: 404,
            name: 'NotFound',
            message: 'User not found'
         }
      })
   }

   const updatedUser = {
      id: parseInt(id),
      name: name || users[userIndex].name,
      username: username || users[userIndex].username,
      password: password || users[userIndex].password,
      email: email || users[userIndex].email,
      role: role || users[userIndex].role

   }

   users[userIndex] = updatedUser
   res.status(200).json({
      data: updatedUser
   })
})

router.delete('/:id', (req, res) => {
   const { id } = req.params
   const userIndex = users.findIndex(u => u.id === parseInt(id))

   if(userIndex === -1) {
      return res.status(404).json({
         error: {
            status: 404,
            name: 'NotFound',
            message: 'User not found'
         }
      })
   }

   const deletedUser = users.splice(userIndex, 1) [0]
   res.status(200).json({
      data: deletedUser
   })

})

export default router