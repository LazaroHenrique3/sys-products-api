import 'dotenv/config'
import Express from 'express'
import UserController from './controllers/UserController'
import PostController from './controllers/PostController'

const app = Express()
app.use(Express.json())

const PORT = process.env.PORT ? process.env.PORT : 8000

app.post('/createUser', UserController.createUser)
app.post('/createPost', PostController.createPost)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})