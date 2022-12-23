import 'reflect-metadata'

import { errorMiddleWare } from '@infrastructure/middlewares/error.middleware'
import CategoryRoutes from '@infrastructure/routes/category.routes'
import DishRoutes from '@infrastructure/routes/dish.routes'
import RestaurantRoutes from '@infrastructure/routes/restaurant.routes'
import UserRoutes from '@infrastructure/routes/user.routes'
import cors from 'cors'
import express from 'express'

const app = express()

const origin = (process.env.ALLOWED_ORIGIN as string) || 'http://localhost:3000'

const allowedOrigins = [origin]

const options: cors.CorsOptions = {
  origin: allowedOrigins,
}

app.use(cors(options))
app.use(express.json())
app.use('/user', UserRoutes)
app.use('/restaurant', RestaurantRoutes)
app.use('/category', CategoryRoutes)
app.use('/dish', DishRoutes)

app.get('/', (_, res) => {
  res.send('Check My Menu | Express + TypeScript Server')
})
app.use(errorMiddleWare)

export default app
