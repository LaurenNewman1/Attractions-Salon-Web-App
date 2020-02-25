import mongoose from 'mongoose';

const test = async () => mongoose.connect(process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

export default test;
