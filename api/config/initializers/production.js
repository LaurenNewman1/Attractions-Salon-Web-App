import morgan from 'morgan';
import mongoose from 'mongoose';
import session from 'express-session';
import connectMongo from 'connect-mongo';

const MongoStore = connectMongo(session);

const production = async (app) => {
  app.use(morgan('dev'));
  const connection = mongoose.connect(process.env.DB_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  app.use(session({
    store: new MongoStore({ mongooseConnection: connection }),
    secret: process.env.STORE_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  }));
  return connection;
};

export default production;
