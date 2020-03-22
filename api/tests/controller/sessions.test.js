import { getParams, SetupTesting, CleanUp, SignIn } from '../helpers/test_helper';
import { userParams, MakeUser } from '../factories/user';

describe('Session Controller', () => {
  let disconnectDB, agent, refreshAgent;
  let user;

  beforeEach(async () => {
    [agent, refreshAgent, disconnectDB] = await SetupTesting();
  });

  beforeEach(async (done) => {
    await CleanUp();
    user = await MakeUser();
    await 
    refreshAgent();
    done();
  });

  afterAll(async (done) => {
    await CleanUp(disconnectDB);
    done();
  });

  const validLogin = {
    email: userParams.email,
    password: userParams.password,
  };

  describe('POST /login', () => {
    it ('should return 200 (OK) if given a valid user to login as', async () => {
      await agent.post('/api/login').send(getParams(validLogin)).set('Accept', 'application/json').expect(200);
    });

    it ('should define a cookie with the user id if successful', async () => {
      await SignIn(agent, validLogin);
      await agent.get('/api/users').set('Accept', 'application/json').expect(200);
    });
  });

  describe('DELETE /logout', () => {
    it ('should return 200 (OK) if logged in', async () => {
      await SignIn(agent, validLogin);
      await agent.delete('/api/logout').send().set('Accept', 'application/json').expect(200);
    });

    it ('should return 403 (Forbidden) if not logged in', async () => {
      await agent.delete('/api/logout').send().set('Accept', 'application/json').expect(403);
    });
  });
});