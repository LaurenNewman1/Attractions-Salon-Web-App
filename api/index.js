import express from 'express'
import proxy from 'express-http-proxy'
import initializeDevelopment from './config/initializers/development.js'
import initializeProduction from './config/initializers/production.js'
import configureRouter from './config/routes.js'
const inProduction = process.env.NODE_ENV === 'production'

const app = express()
const port = inProduction ? process.env.PORT : 8080

// Environment Initialize
// This would include things such as generating the mongoose connection and logging
if (inProduction) {
  initializeProduction(app)
} else {
  initializeDevelopment(app)
}

// Define Router
// This would include defining routes to the controllers
configureRouter(app)

// Serve Front End
if (inProduction) {
  app.get('/*', express.static(__dirname + '/../client'));
} else {
  app.get('/*', proxy('http://localhost:3000'));
}

app.listen(port, () => console.log(`Server is listening on port ${port}!`))