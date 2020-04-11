import User from '../../model/user';
import argon2 from 'argon2';

import { getParams, SetupTesting, CleanUp } from '../helpers/test_helper'
import { userParams as validUser, MakeUser } from '../factories/user'

describe('User Controller', () => {
  let agent, disconnectDB, refreshAgent;

  beforeEach(async () => {
    [agent, refreshAgent, disconnectDB] = await SetupTesting();
  });

  describe('POST /create', () => {
    beforeEach(async (done) => {
      await CleanUp();
      done();
    });

    afterAll(async (done) => {
      await CleanUp(disconnectDB);
      done()
    });;

    it ('should return 200 (OK) if given a valid user to create', async () => {
      await agent.post('/api/users').send(getParams(validUser)).set('Accept', 'application/json').expect(200);
    });

    it ('should generator a hashed password given the plaintext user password', async () => {
      await agent.post('/api/users').send(getParams(validUser)).set('Accept', 'application/json').expect(200).then(res => {
        argon2.verify(res.body.password, validUser.password).then((result) => expect(result).toEqual(true));
      });
    });

    it ('should return 403 (Forbidden) if given an incalid user to create', async () => {
      const { email, ...invalidUser } = validUser
      await agent.post('/api/users').send(getParams(invalidUser)).set('Accept', 'application/json').expect(403);
    });
  });

  describe('PUT /update/:someId', () => {
    let user;

    beforeEach(async (done) => {
      await CleanUp();
      user = await MakeUser();
      done();
    });

    afterAll(async (done) => {
      await CleanUp(disconnectDB);
      done()
    });

    it ('should return 200 (OK) if given a valid user to update', async () => {
      await agent.put(`/api/users/${user._id}`)
        .send(getParams({ name: 'test' }))
        .set('Accept', 'application/json')
        .expect(200);
    });

    it ('should return 403 (Forbidden) to attempt to update the password without the old one', async () => {
      const updateParams = {
        name: 'test1',
        email: 'test1@test.com',
        password: 'test1password',
        role: 1
      };
      await agent.put(`/api/users/${user._id}`)
        .send(getParams(updateParams))
        .set('Accept', 'application/json')
        .expect(403);
    });


    it ('should return 403 (Forbidden) to attempt to update the password with an incorrect old one', async () => {
      const updateParams = {
        name: 'test1',
        email: 'test1@test.com',
        password: 'test1password',
        insertedPassword: 'wrong',
        role: 1
      };
      await agent.put(`/api/users/${user._id}`).send(getParams(updateParams)).set('Accept', 'application/json').expect(403);
    });

    it ('should correctly update all of the attributes', async () => {

      const updateParams = {
        name: 'test1',
        email: 'test1@test.com',
        password: 'test1password',
        insertedPassword: 'testpassword',
        role: 1
      };
      const { insertedPassword, ...compareParams } = updateParams;
      await agent.put(`/api/users/${user._id}`).send(getParams(updateParams)).set('Accept', 'application/json').expect(200);
      user = await User.findById(user._id).exec();
      const updatedUser = {
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
      }

      expect(updatedUser).toEqual(compareParams);
    });
  });

  describe('DELETE /users/:someId', () => {
    beforeEach(async (done) => {
      await CleanUp();
      refreshAgent();
      done()
    });

    afterAll(async (done) => {
      await CleanUp(disconnectDB);
      done()
    });

    describe('as Owner', () => {
      beforeEach(async (done) => {
        await MakeOwner();
        await SignIn(agent, ownerParams);
        done();
      });

      it ('should return 200 (OK) if given a valid user to delete', async () => {
        const res = await agent.post('/api/users').send(getParams(validUser)).set('Accept', 'application/json');
        await agent.delete('/api/users/' + res.body._id).send(getParams(validUser)).set('Accept', 'application/json').expect(200);
      });
  
      it ('should return 404 (Not Found) if given an invalid user to delete', async () => {
        await agent.delete('/api/users/5e5b0129be7a7430e036ee9a').send(getParams(validUser)).set('Accept', 'application/json').expect(404);
      });
  
      it ('should return 400 (Bad Request) if given an invalid path', async () => {
        await agent.delete('/api/users/random').send(getParams(validUser)).set('Accept', 'application/json').expect(400);
      });
    });

    describe('not as Owner', () => {
      beforeEach(async (done) => {
        await MakeWorker();
        await SignIn(agent, workerParams);
        done();
      });

      it ('should return 403 (Forbidden) when trying to remove a user', async () => {
        const res = await agent.post('/api/users').send(getParams(validUser)).set('Accept', 'application/json');
        await agent.delete('/api/users/' + res.body._id).send(getParams(validUser)).set('Accept', 'application/json').expect(403);
      });
    });
  });
});