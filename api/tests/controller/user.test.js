import User from '../../model/user';
import request from 'supertest';
import configureApp from '../../config/init';
import argon2 from 'argon2';

describe('User Controller', () => {
  let disconnectDB, app;

  beforeAll(async () => {
    [app, disconnectDB] = await configureApp();
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

  describe('POST /create', () => {
    beforeEach(async (done) => {
      await User.deleteMany({});
      done()
    });

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

  describe('DELETE /users/:someId', () => {

    it ('should return 200 (OK) if given a valid user to delete', async () => {
      const res = await request(app).post('/users').send(getParams(validUser)).set('Accept', 'application/json');
      await request(app).delete('/users/' + res.body._id).send(getParams(validUser)).set('Accept', 'application/json').expect(200);
    });

    it ('should return 404 (Not Found) if given an invalid user to delete', async () => {
      await request(app).delete('/users/5e5b0129be7a7430e036ee9a').send(getParams(validUser)).set('Accept', 'application/json').expect(404);
    });

    it ('should return 400 (Bad Request) if given an invalid path', async () => {
      await request(app).delete('/users/random').send(getParams(validUser)).set('Accept', 'application/json').expect(400);
    });
  });
});