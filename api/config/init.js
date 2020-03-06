import express from 'express';
import proxy from 'express-http-proxy';
import path from 'path';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import initializeDevelopment from './initializers/development';
import initializeProduction from './initializers/production';
import initializeTest from './initializers/testing';
import configureRouter from './routes';

dotenv.config();

const environment = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
const inProduction = environment === 'production';

export default async () => {
  const app = express();
  let connection;

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // Environment Initialize
  // This would include things such as generating the mongoose connection and logging
  switch (environment) {
    case 'production':
      await initializeProduction(app);
      break;
    case 'development':
      connection = await initializeDevelopment(app);
      break;
    case 'test':
      connection = await initializeTest(app);
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

  return [app, () => connection.disconnect(), environment];
};
