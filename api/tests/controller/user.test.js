import User from '../../model/user';
import request from 'supertest';
import configureApp from '../../config/config';
import argon2 from 'argon2';

describe('User Controller', () => {
  let disconnectDB, app;

  beforeAll(async () => {
    [app, disconnectDB] = await configureApp();
  });

  describe('POST /create', () => {
    beforeEach(async (done) => {
      await User.deleteMany({});
      done()
    });

    afterAll(async (done) => {
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

    it ('should return 200 (OK) if given a valid user to create', async () => {
      await request(app).post('/users').send(getParams(validUser)).set('Accept', 'application/json').expect(200);
    });

    it ('should generator a hashed password given the plaintext user password', async () => {
      await request(app).post('/users').send(getParams(validUser)).set('Accept', 'application/json').expect(200).then(res => {
        argon2.verify(res.body.password, validUser.password).then((result) => expect(result).toEqual(true));
      });
    });

    it ('should return 403 (Forbidden) if given an incalid user to create', async () => {
      const { email, ...invalidUser } = validUser
      await request(app).post('/users').send(getParams(invalidUser)).set('Accept', 'application/json').expect(403);
    });
  });
});