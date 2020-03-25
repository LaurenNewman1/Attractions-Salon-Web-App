import Appointment from '../../model/appointment';
import {appointmentParams as validAppointment} from '../factories/appointment';
import request from 'supertest';
import configureApp from '../../config/init';

describe('Appointment Controller', () => {
    let disconnectDB, app;

    beforeEach(async () => {
        [app, disconnectDB] = await configureApp();
    });

    afterEach(async (done) => {
        await Appointment.deleteMany({});
        await disconnectDB();
        done()
    });

    const getParams = (user) => {
        let result = ''
        Object.keys(user).forEach((key) => result += `${key}=${user[key]}&`)
        return result.slice(0, -1);
    }

    const invalidAppointment = {
        services: 'Service1, Service2',
        specialist: 'testspecialist',
        notes: 'testnotes',
    }

    describe('POST /api/appointments', () => {
        beforeEach(async (done) => {
            await Appointment.deleteMany({});
            done()
        });



        it ('should return 200 (OK) if given a valid appointment to create', async () => {
            await request(app).post('/api/appointments').send(getParams(validAppointment)).set('Accept', 'application/json').expect(200);
        });

        it ('should return 403 (Forbidden) if given an invalid appointment to create', async () => {
            await request(app).post('/api/appointments').send(getParams(invalidAppointment)).set('Accept', 'application/json').expect(403);
        });
    });

    describe('PUT /api/appointments/:someId', () => {
        beforeEach(async (done) => {
            await Appointment.deleteMany({});
            done()
        });


        it ('should correctly update all of the attributes', async () => {

            const updateParams = {...validAppointment, name: 'test2'};
            const res = await request(app).post('/api/appointments').send(getParams(validAppointment)).set('Accept', 'application/json');
            await request(app).put('/api/appointments/' + res.body._id).send(getParams(updateParams)).set('Accept', 'application/json').expect(200);
            const appointment = await Appointment.findById(res.body._id).exec();
            const updatedAppointment = {...updateParams, name: appointment.name}

            expect(updatedAppointment).toEqual(updateParams);
        });
    });

    describe('DELETE /api/appointments/:someId', () => {
        beforeEach(async (done) => {
            await Appointment.deleteMany({});
            done()
        });



        it ('should return 200 (OK) if given a valid appointment to delete', async () => {
            const res = await request(app).post('/api/appointments').send(getParams(validAppointment)).set('Accept', 'application/json');
            await request(app).delete('/api/appointments/' + res.body._id).send(getParams(validAppointment)).set('Accept', 'application/json').expect(200);
        });
    });

    describe('READ /api/appointments/:someId', () => {
        beforeEach(async (done) => {
            await Appointment.deleteMany({});
            done()
        });



        it ('should return 200 (OK) if given a valid appointment to read', async () => {
            const res = await request(app).post('/api/appointments').send(getParams(validAppointment)).set('Accept', 'application/json');
            await request(app).get('/api/appointments/' + res.body._id).send(getParams(validAppointment)).set('Accept', 'application/json').expect(200);
        });

    });

    describe('READ /api/appointments', () => {
        beforeEach(async (done) => {
            await Appointment.deleteMany({});
            done()
        });


        it ('should return 200 (OK) if there are appointments to read', async () => {
            await request(app).post('/api/appointments').send(getParams(validAppointment)).set('Accept', 'application/json');
            await request(app).get('/api/appointments').send(getParams(validAppointment)).set('Accept', 'application/json').expect(200);
        });
    });
});