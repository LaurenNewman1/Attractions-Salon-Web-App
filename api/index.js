import configureApp from './config/init';
import GetLogger from './config/logger';

const onSignal = () => {
  mongoose.disconnect();
};

const startServer = async () => {
  const logger = GetLogger('Server Init');
  try {
    const [app, closeDB, environment] = await configureApp();
    const port = environment === 'production' ? process.env.PORT : 8080;

    app.listen(port, () => logger.info(`Server is listening on port ${port}!`));
  } catch (err) {
    logger.error(err);
  }
};

startServer();

export default configureApp;
