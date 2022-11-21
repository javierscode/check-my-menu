import 'reflect-metadata'

import { errorMiddleWare } from '@infrastructure/middlewares/error.middleware'
import UserRoutes from '@infrastructure/routes/user.routes'
import cors from 'cors'
import express from 'express'

const PORT = 3001

const app = express()

const allowedOrigins = ['http://localhost:3000']

const options: cors.CorsOptions = {
  origin: allowedOrigins,
}

app.use(cors(options))
app.use(express.json())
app.use('/user', UserRoutes)

app.get('/', (_, res) => {
  res.send('Express + TypeScript Server')
})

app.use(errorMiddleWare)

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
