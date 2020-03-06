import User from '../../model/user';
import request from 'supertest';
import configureApp from '../../config/init';
import cookieParser from 'cookie-parser';

describe('Session Controller', () => {
  let disconnectDB, app;
  let agent;

  beforeEach(async () => {
    [app, disconnectDB] = await configureApp();
    app.use(cookieParser());
    agent = request.agent(app);
  });

  beforeEach(async (done) => {
    await User.deleteMany({});
    agent = request.agent(app);
    done();
  });

  afterAll(async (done) => {
    await User.deleteMany({});
    await disconnectDB();
    done()
  });

  const getParams = (user) => {
    let result = ''
    Object.keys(user).forEach((key) => result += `${key}=${user[key]}&`)
    return result.slice(0, -1);
  }

  const validUser = {
    name: 'test',
    email: 'test@test.com',
    password: 'testpassword',
    role: 0,
  }

  const validLogin = {
    email: 'test@test.com',
    password: 'testpassword',
  }

  describe('POST /login', () => {
    it ('should return 200 (OK) if given a valid user to login as', async (done) => {
      await agent.post('/users').send(getParams(validUser)).set('Accept', 'application/json').expect(200);
      await agent.post('/login').send(getParams(validLogin)).set('Accept', 'application/json').expect(200).then(() => done());
    });

    it ('should define a cookie with the user id if successful', async () => {
      await agent.post('/users').send(getParams(validUser)).set('Accept', 'application/json').expect(200);
      await agent.post('/login').send(getParams(validLogin)).set('Accept', 'application/json').expect(200);
      await agent.get('/users').set('Accept', 'application/json').expect(200);
    });
  });

  describe('DELETE /logout', () => {
    it ('should return 200 (OK) if logged in', async () => {
      await agent.post('/users').send(getParams(validUser)).set('Accept', 'application/json').expect(200);
      await agent.post('/login').send(getParams(validLogin)).set('Accept', 'application/json').expect(200);
      await agent.delete('/logout').send().set('Accept', 'application/json').expect(200);
    });

    it ('should return 403 (Forbidden) if not logged in', async () => {
      await agent.delete('/logout').send().set('Accept', 'application/json').expect(403);
    });
  });
});