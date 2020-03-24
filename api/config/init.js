import express from 'express';
import proxy from 'express-http-proxy';
import path from 'path';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import GetLogger from './logger';
import initializeDevelopment from './initializers/development';
import initializeProduction from './initializers/production';
import initializeTest from './initializers/testing';
import configureRouter from './routes';

dotenv.config();

const environment = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
const inProduction = environment === 'production';

if (process.env.NODE_ENV === 'test') {
  process.env.LOGGING = 'warn';
}

export default async () => {
  const app = express();
  const logger = GetLogger('Server Init');

  logger.info('Starting Server...');
  logger.debug(`NODE_ENV: ${environment}`);

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

  logger.debug('Middleware Configured');

  // Define Router
  // This would include defining routes to the controllers
  configureRouter(app);
  logger.debug('Router Configured');

  // Serve Front End
  if (inProduction) {
    app.use(express.static(path.join(__dirname, '/../../client/')));
    app.get('/*', (req, res) => res.sendFile(path.resolve(path.join(__dirname, '/../../client/'), 'index.html')));
  } else {
    app.get('/*', proxy('http://localhost:3000'));
  }

  return [app, async () => connection.connection.close(), environment];
};
