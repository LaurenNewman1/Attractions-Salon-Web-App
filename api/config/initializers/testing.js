import morgan from 'morgan';
import mongoose from 'mongoose';

const test = async (app) => {
  app.use(morgan('dev'));
  return mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
};

export default test;
