import morgan from 'morgan';
import mongoose from 'mongoose';
import session from 'express-session';

const MongoStore = require('connect-mongo')(session);

const production = async (app) => {
  app.use(morgan('dev'));
  const connection = await mongoose.connect(process.env.DB_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
  app.use(session({
    store: new MongoStore({ url: process.env.DB_URL }),
    secret: process.env.STORE_KEY,
    resave: false,
    saveUninitialized: false,
  }));
  return connection;
};


export default production;
