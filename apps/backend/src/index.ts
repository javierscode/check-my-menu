import * as dotenv from 'dotenv'
dotenv.config()
// eslint-disable-next-line import/first
import app from './app'
const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
