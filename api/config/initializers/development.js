import morgan from 'morgan';

const development = (app) => {
  app.use(morgan('dev'));
};

export default development;
