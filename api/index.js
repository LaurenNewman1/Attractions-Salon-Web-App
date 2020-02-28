import dotenv from 'dotenv';
import express from 'express';
import proxy from 'express-http-proxy';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { createTerminus } from '@godaddy/terminus';
import initializeDevelopment from './config/initializers/development';
import initializeProduction from './config/initializers/production';
import initializeTest from './config/initializers/testing';
import configureRouter from './config/routes';

dotenv.config();

const environment = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
const inProduction = environment === 'production';
const port = environment === inProduction ? process.env.PORT : 8080;

const onSignal = () => {
  mongoose.disconnect();
};

const configureApp = async () => {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));


  // Environment Initialize
  // This would include things such as generating the mongoose connection and logging
  switch (environment) {
    case 'production':
      await initializeProduction(app);
      break;
    case 'development':
      await initializeDevelopment(app);
      break;
    case 'test':
      await initializeTest();
      break;
    default:
      console.error('Unknown node environment!');
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

  return app;
};

const startServer = async () => {
  try {
    const app = await configureApp();

    app.listen(port, () => console.log(`Server is listening on port ${port}!`));
  } catch(err) {
    console.error(err);
  }
};

startServer();

export default configureApp;
