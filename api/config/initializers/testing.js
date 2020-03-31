import morgan from 'morgan';
import mongoose from 'mongoose';
import session from 'express-session';
import connectMongo from 'connect-mongo';

const MongoStore = connectMongo(session);

const test = async (app) => {
  app.use(morgan('dev'));
  const connection = await mongoose.connect(process.env.DB_URL_TEST,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
  app.use(session({
    store: new MongoStore({ mongooseConnection: connection.connection }),
    secret: 'development',
    resave: false,
    saveUninitialized: true,
  }));
  return connection;
};

export default test;
