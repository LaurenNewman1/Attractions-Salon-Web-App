import Service from '../../model/service';
import request from 'supertest';
import configureApp from '../../config/init';

describe('Service Controller', () => {
    let disconnectDB, app;

    beforeAll(async () => {
        [app, disconnectDB] = await configureApp();
    });

    afterAll(async (done) => {
        await Service.deleteMany({});
        await disconnectDB();
        done()
    });

    const getParams = (user) => {
        let result = ''
        Object.keys(user).forEach((key) => result += `${key}=${user[key]}&`)
        return result.slice(0, -1);
    }

    const validService = {
        name: 'test',
       price: 9.99,
        addinfo: 'testinfo',
    }
    const invalidService = {
        //name: undefined,
        price: 9.99,
        addinfo: 'testinfo',
    }

    describe('POST /create', () => {
        beforeEach(async (done) => {
            await Service.deleteMany({});
            done()
        });

        it ('should return 200 (OK) if given a valid service to create', async () => {
            await request(app).post('/services').send(getParams(validService)).set('Accept', 'application/json').expect(200);
        });

        it ('should return 403 (Forbidden) if given an invalid serivce to create', async () => {
            await request(app).post('/services').send(getParams(invalidService)).set('Accept', 'application/json').expect(403);
        });
    });

    describe('READ /services/:someId', () => {
        beforeEach(async (done) => {
            await Service.deleteMany({});
            done()
        });

        it ('should return 200 (OK) if given a valid user to read', async () => {
            const res = await request(app).post('/services').send(getParams(validService)).set('Accept', 'application/json');
            await request(app).get('/services/' + res.body._id).send(getParams(validService)).set('Accept', 'application/json').expect(200);
        });

        it ('should return 404 (Not Found) if given an invalid serivce to read', async () => {
            await request(app).get('/services/5e5b0129be7a7430e036ee9a').send(getParams(validService)).set('Accept', 'application/json').expect(404);
        });

        it ('should return 400 (Bad Request) if given an invalid path', async () => {
            await request(app).get('/services/random').send(getParams(validService)).set('Accept', 'application/json').expect(400);
        });
    });

    describe('READ /services', () => {
        beforeEach(async (done) => {
            await Service.deleteMany({});
            done()
        });

        it ('should return 200 (OK) if there are services to read', async () => {
            await request(app).post('/services').send(getParams(validService)).set('Accept', 'application/json');
            await request(app).get('/services').send(getParams(validService)).set('Accept', 'application/json').expect(200);
        });

        it ('should return 404 (Not Found) if there are no serivces to read', async () => {
            await request(app).get('/services').send(getParams(validService)).set('Accept', 'application/json').expect(404);
        });
    });
});