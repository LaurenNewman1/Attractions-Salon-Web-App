import * as users from '../controllers/userController.js';

const router = (app) => {
  app.get('/api', (req, res) => res.send('Hello World!'));

  //User Routes
  app.get('/users/:someId', users.read);
  app.delete('/users/:someId', users.remove);
};

export default router;
