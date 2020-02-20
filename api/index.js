import express from 'express'
import initializeDevelopment from './config/initializers/development.js'
import initializeProduction from './config/initializers/production.js'
import configureRouter from './config/routes.js'
const inProduction = process.env.NODE_ENV === 'production'

const app = express()
const port = inProduction ? process.env.PORT : 8080

if (inProduction) {
  initializeProduction(app)
} else {
  initializeDevelopment(app)
}

configureRouter(app)

app.listen(port, () => console.log(`Server is listening on port ${port}!`))