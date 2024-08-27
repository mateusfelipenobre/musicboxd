import express from 'express';

const app = express();
const port = 3000;

 app.use(express.json())

 interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    password: string;
    role: string;
 }

 const users: User [] = []

 app.post('/users', (req, res) => {
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

 app.get('/users', (req, res) => {
   res.json({
      data: users
   })
 })
 app.get('/users/:id', (req, res) => {
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

app.delete('/users/:id', (req, res) => {
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

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
