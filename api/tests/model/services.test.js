import configureApp from '../../config/init';
import Service from '../../model/service';

describe('Service Model', () => {
    let disconnectDB;

    beforeAll(async () => {
        disconnectDB = (await configureApp())[1];
    });

    beforeEach(async (done) => {
        await Service.deleteMany({});
        done()
    });

    afterAll(async (done) => {
        await Service.deleteMany({});
        await disconnectDB();
        done()
    });

    const validService = {
        name: 'test',
        price: 9.99,
        addinfo: 'testinfo',
    }

    it ('should be valid with all valid parameters', async () => {
        expect(await Service.validate(validService)).toEqual(undefined);
    });

    it ('should be not valid with an invalid name', async (done) => {
        try {
            await Service.validate({ ...validUser, name: undefined })
            done("Failed to throw validation error")
        } catch(err) {
            done()
        }
    });
});