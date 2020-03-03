import configureApp from './config/init';

const onSignal = () => {
  mongoose.disconnect();
};

const startServer = async () => {
  try {
    const [app, closeDB, environment] = await configureApp();
    const port = environment === 'production' ? process.env.PORT : 8080;

    app.listen(port, () => console.log(`Server is listening on port ${port}!`));
  } catch(err) {
    console.error(err);
  }
};

startServer();

export default configureApp;
