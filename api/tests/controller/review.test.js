import { getParams, SetupTesting, CleanUp, SignIn } from '../helpers/test_helper'
import { userParams as validUser, ownerParams, MakeUser, MakeOwner, workerParams, MakeWorker } from '../factories/user'
import { reviewParams as validReview, MakeReview } from '../factories/review'

describe('Review Controller', () => {
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

    const invalidReview = {
        reviewer: 'invalid',
        review: 'review'
    }
  
    describe('POST /create', () => {
        beforeEach(async (done) => {
            await CleanUp();
            done();
        });

        it('should return 200 (OK) if given a valid review', async () => {
            await agent.post('/api/reviews').send(getParams(validReview)).set('Accept', 'application/json').expect(200);
        });

        it('should return 403 (Invalid) if given an invalid review', async () => {
            await agent.post('/api/reviews').send(getParams(invalidReview)).set('Accept', 'application/json').expect(403);
        });
    });

    describe('POST /create', () => {
        let service;
        beforeEach(async (done) => {
            await CleanUp();
            review = await MakeReview();
            refreshAgent();
            done();
        });

        describe('as Owner', () => {
            beforeEach(async (done) => {
                await MakeOwner();
                await SignIn(agent, ownerParams);
                done();
            });

            it('should return 200 (OK) if owner can delete review', async () => {
                await agent.delete('/api/reviews/' + review._id).set('Accept', 'application/json').expect(200);
            });
        });

        describe('not as Owner', () => {
            beforeEach(async (done) => {
              await MakeWorker();
              await SignIn(agent, workerParams);
              done();
            });
      
            it ('should return 403 (Forbidden) when trying to delete review', async () => {
              await agent.delete('/api/reviews/' + review._id).set('Accept', 'application/json').expect(403);
            });
        });
    });
});