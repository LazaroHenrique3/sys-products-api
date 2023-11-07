import 'dotenv/config'
import Express from 'express'

const app = Express()
app.use(Express.json())

const PORT = process.env.PORT ? process.env.PORT : 8000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})