import 'reflect-metadata'

import { errorMiddleWare } from '@infrastructure/middlewares/error.middleware'
import CategoryRoutes from '@infrastructure/routes/category.routes'
import RestaurantRoutes from '@infrastructure/routes/restaurant.routes'
import UserRoutes from '@infrastructure/routes/user.routes'
import cors from 'cors'
import express from 'express'

const app = express()

const allowedOrigins = ['http://localhost:3000']

const options: cors.CorsOptions = {
  origin: allowedOrigins,
}

app.use(cors(options))
app.use(express.json())
app.use('/user', UserRoutes)
app.use('/restaurant', RestaurantRoutes)
app.use('/category', CategoryRoutes)

app.get('/', (_, res) => {
  res.send('Express + TypeScript Server')
})
app.use(errorMiddleWare)

export default app
