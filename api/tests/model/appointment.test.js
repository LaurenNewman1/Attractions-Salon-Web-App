import configureApp from '../../config/init';
import Appointment from '../../model/appointment'
import {appointmentParams as appointmentParams} from '../factories/appointment';
import Service from '../../model/service';
import User from '../../model/user';
import {serviceParams, MakeService} from '../factories/service';
import {workerParams, MakeWorker} from '../factories/user';

describe('Appointment Model', () => {
    let disconnectDB;

    beforeEach(async () => {
        disconnectDB = (await configureApp())[1];
    });

    beforeEach(async (done) => {
        await Appointment.deleteMany({});
        await User.deleteMany({});
        await Service.deleteMany({});
        done()
    });

    afterAll(async (done) => {
        await Appointment.deleteMany({});
        await User.deleteMany({});
        await Service.deleteMany({});
        await disconnectDB();
        done()
    });

    it ('should be valid with all valid parameters', async () => {
        let user = await MakeWorker();
        let service = await MakeService();
        expect(await Appointment.validate({...appointmentParams, services: service._id, specialist: user._id})).toEqual(undefined);
    });

    it ('should be not valid with an invalid name', async (done) => {
        try {
            const user = await MakeWorker();
            const service = await MakeService();
            await Appointment.validate({ ...appointmentParams, name: undefined, services: service._id, specialist: user._id })
            done("Failed to throw validation error")
        } catch(err) {
            done()
        }
    });

    it ('should be not valid with an invalid email', async (done) => {
        try {
            const user = await MakeWorker();
            const service = await MakeService();
            await Appointment.validate({ ...appointmentParams, email: undefined, services: service._id, specialist: user._id })
            done("Failed to throw validation error")
        } catch(err) {
            done()
        }
    });

    it ('should be not valid with an invalid phone', async (done) => {
        try {
            const user = await MakeWorker();
            const service = await MakeService();
            await Appointment.validate({ ...appointmentParams, phone_number: undefined, services: service._id, specialist: user._id })
            done("Failed to throw validation error")
        } catch(err) {
            done()
        }
    });

    it ('should be not valid with an invalid confirmation', async (done) => {
        try {
            const user = await MakeWorker();
            const service = await MakeService();
            await Appointment.validate({ ...appointmentParams, confirmed: undefined, services: service._id, specialist: user._id })
            done("Failed to throw validation error")
        } catch(err) {
            done()
        }
    });

    it ('should be not valid with an invalid time', async (done) => {
        try {
            const user = await MakeWorker();
            const service = await MakeService();
            await Appointment.validate({ ...appointmentParams, time: undefined, services: service._id, specialist: user._id })
            done("Failed to throw validation error")
        } catch(err) {
            done()
        }
    });

    it ('should be not valid with an invalid services', async (done) => {
        try {
            const user = await MakeWorker();
            await Appointment.validate({ ...appointmentParams, services: undefined, specialist: user._id })
            done("Failed to throw validation error")
        } catch(err) {
            done()
        }
    });

    it ('should be valid with a missing specialist', async () => {
        const service = await MakeService();
        expect(await Appointment.validate({ ...appointmentParams, services: service._id, specialist: undefined })).toEqual(undefined);
    });

    it ('should be valid with missing notes', async () => {
        const user = await MakeWorker();
        const service = await MakeService();
        expect(await Appointment.validate({ ...appointmentParams, services: service._id, specialist: user._id, notes: undefined })).toEqual(undefined);

    });
});