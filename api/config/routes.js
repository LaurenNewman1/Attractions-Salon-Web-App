import * as users from '../controllers/userController';
import * as services from '../controllers/serviceController';
import * as sessions from '../controllers/sessionController';

const router = (app) => {
  // Session Routes
  app.post('/api/login', sessions.create);
  app.delete('/api/logout', sessions.destroy);

  // User Routes
  app.get('/api/users', users.read);
  app.delete('/api/users/:someId', users.remove);
  app.put('/api/users/:someId', users.update);
  app.post('/api/users', users.create);

  // Service Routes
  app.post('/api/services', services.create);
  app.get('/api/services', services.readall);
  app.get('/api/services/types/:type', services.readType);
  app.get('/api/services/types/:type/:subtype', services.readType);
  app.get('/api/services/:someId', services.read);
};

export default router;
