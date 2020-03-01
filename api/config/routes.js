import * as users from '../controllers/userController.js';
import * as services from '../controllers/serviceController.js';

const router = (app) => {
  app.get('/api', (req, res) => res.send('Hello World!'));

  //User Routes
  app.get('/users/:someId', users.read);
  app.delete('/users/:someId', users.remove);
  app.put('/users/:someId', users.update);

  //Service Routes
  app.get('/services',services.readall)
  app.get('/services/:someId',services.read)
};

export default router;
