import morgan from 'morgan';
import mongoose from 'mongoose';

const development = async (app) => {
  app.use(morgan('dev'));
  return mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
};

export default development;
