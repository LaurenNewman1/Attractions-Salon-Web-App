import * as users from '../controllers/userController';
import * as services from '../controllers/serviceController';
import * as sessions from '../controllers/sessionController';

const router = (app) => {

  // Session Routes
  app.post('/login', sessions.create);
  app.delete('/logout', sessions.destroy);

  // User Routes
  app.get('/users', users.read);
  app.delete('/users/:someId', users.remove);
  app.put('/users/:someId', users.update);
  app.post('/users', users.create);

  // Service Routes
  app.post('/services', services.create)
  app.get('/services',services.readall);
  app.get('/services/:someId',services.read);
};

export default router;
