import request from 'supertest';
import cookieParser from 'cookie-parser';
import configureApp from '../../config/init';

import User from '../../model/user';
import Service from '../../model/service';

export const getParams = (user) => {
  let result = '';
  // eslint-disable-next-line no-return-assign
  Object.keys(user).forEach((key) => result += `${key}=${user[key]}&`);
  return result.slice(0, -1);
};

export const SetupTesting = async () => {
  const [app, disconnectDB] = await configureApp();
  app.use(cookieParser());
  const agent = request.agent(app);

  return [agent, () => request.agent(app), async () => disconnectDB()];
};

export const CleanUp = async (disconnectDB) => {
  await User.deleteMany({});
  await Service.deleteMany({});
  if (disconnectDB) {
    await disconnectDB();
  }
};

export const SignIn = async (agent, params) => {
  await agent.post('/api/login').send(getParams({ email: params.email, password: params.password })).set('Accept', 'application/json').expect(200);
};
