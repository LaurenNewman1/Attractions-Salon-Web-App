import morgan from 'morgan';

const production = async (app) => {
  app.use(morgan('dev'));
};

export default production;
