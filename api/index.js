import express from 'express';
import proxy from 'express-http-proxy';
import path from 'path';
import mongoose from 'mongoose';
import { createTerminus } from '@godaddy/terminus';
import initializeDevelopment from './config/initializers/development';
import initializeProduction from './config/initializers/production';
import configureRouter from './config/routes';

const inProduction = process.env.NODE_ENV === 'production';

const app = express();
const port = inProduction ? process.env.PORT : 8080;

const onSignal = () => {
  mongoose.disconnect();
};

const startServer = async () => {
  // Environment Initialize
  // This would include things such as generating the mongoose connection and logging
  if (inProduction) {
    initializeProduction(app);
  } else {
    initializeDevelopment(app);
  }

  // Define Router
  // This would include defining routes to the controllers
  configureRouter(app);

  // Serve Front End
  if (inProduction) {
    app.get('/*', express.static(path.join(__dirname, '/../client')));
  } else {
    app.get('/*', proxy('http://localhost:3000'));
  }

  createTerminus(app, {
    signal: 'SIGINT',
    onSignal,
  });

  app.listen(port, () => console.log(`Server is listening on port ${port}!`));
};

startServer();
