import morgan from 'morgan';
import mongoose from 'mongoose';
import session from 'express-session';
import connectMongo from 'connect-mongo';

const MongoStore = connectMongo(session);

const production = async (app) => {
  app.use(morgan('dev'));
  const connection = await mongoose.connect(process.env.DB_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
  app.use(session({
    store: new MongoStore({ mongooseConnection: connection.connection }),
    secret: process.env.STORE_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  }));
  return connection;
};


export default production;
