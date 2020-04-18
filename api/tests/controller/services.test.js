import { getParams, SetupTesting, CleanUp, SignIn } from '../helpers/test_helper'
import { userParams as validUser, ownerParams, MakeUser, MakeOwner, workerParams, MakeWorker } from '../factories/user'
import { serviceParams as validService, MakeService } from '../factories/service';

describe('Service Controller', () => {
  let agent, disconnectDB, refreshAgent;

  beforeEach(async () => {
    if (disconnectDB) {
      await CleanUp(disconnectDB);
    }
    [agent, refreshAgent, disconnectDB] = await SetupTesting();
  });

  afterAll(async (done) => {
    await CleanUp(disconnectDB);
    done();
  });

  const invalidService = {
    //name: undefined,
    price: 9.99,
    addinfo: 'testinfo',
  }

  describe(':create POST /services', () => {
    beforeEach(async (done) => {
      await CleanUp();
      refreshAgent();
      done();
    });

    describe('as Owner', () => {
      beforeEach(async (done) => {
        await MakeOwner();
        await SignIn(agent, ownerParams);
        done();
      });

      it ('should return 200 (OK) if given a valid service to create', async () => {
        await agent.post('/api/services').send(getParams(validService)).set('Accept', 'application/json').expect(200);
      });
  
      it ('should return 400 (Bad Request) if given an invalid serivce to create', async () => {
        await agent.post('/api/services').send(getParams(invalidService)).set('Accept', 'application/json').expect(400);
      });
    });

    describe('not as Owner', () => {
      beforeEach(async (done) => {
        await MakeWorker();
        await SignIn(agent, workerParams);
        done();
      });

      it ('should return 403 (Forbidden) when trying to create a service', async () => {
        await agent.post('/api/services').send(getParams(validService)).set('Accept', 'application/json').expect(403);
      });
    })
  });

  describe('READ /services/:someId', () => {
    let service;

    beforeEach(async (done) => {
      await CleanUp();
      await MakeUser();
      await SignIn(agent, validUser);
      service = await MakeService();
      console.log(service);
      done()
    });

    it ('should return 200 (OK) if given a valid service to read', async () => {
      await agent.get('/api/services/' + service._id).set('Accept', 'application/json').expect(200);
    });

    it ('should return 200 (OK) if given a valid type', async () => {
      await agent.get('/api/services/types/hair').send(getParams(validService)).set('Accept', 'application/json').expect(200);
    });

    it ('should return 404 (Not Found) if given an invalid service to read', async () => {
      await agent.get('/api/services/5e5b0129be7a7430e036ee9a').send(getParams(validService)).set('Accept', 'application/json').expect(404);
    });
  });

  describe('READ /services', () => {
    beforeEach(async (done) => {
      await CleanUp();
      await MakeService();
      done();
    });

    it ('should return 200 (OK) if there are services to read', async () => {
      await agent.get(`/api/services`).set('Accept', 'application/json').expect(200);
    });
  });
  
  describe('REMOVE /api/services/:_id', () => {
    let service;
    beforeEach(async (done) => {
      await CleanUp();
      service = await MakeService();
      refreshAgent();
      done();
    });

    describe('as Owner', () => {
      beforeEach(async (done) => {
        await MakeOwner();
        await SignIn(agent, ownerParams);
        done();
      });

      it ('should return 200 (OK) if user is owner', async () => {
        await agent.delete('/api/services/' + service._id).set('Accept', 'application/json').expect(200);
      });
    });

    describe('not as Owner', () => {
      beforeEach(async (done) => {
        await MakeWorker();
        await SignIn(agent, workerParams);
        done();
      });

      it ('should return 403 (Forbidden) when trying to remove a service', async () => {
        await agent.delete('/api/services/' + service._id).set('Accept', 'application/json').expect(403);
      });
    });
  });
});