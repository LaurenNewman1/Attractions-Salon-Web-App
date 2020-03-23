import MakeService from './service';
import MakeWorker from './user';
import Appointment from '../../model/appointment'

export const appointmentParams = {
    name: 'test',
    email: 'test@test.com',
    phone_number: '111-111-1111',
    confirmed: false,
    time: new Date('1995-12-17T03:24:00'),
    notes: 'testnote',
};

export const MakeAppointment = async () => {
    const services = await MakeService;
    const worker = await  MakeWorker;
    const appointment = await Appointment.create({...appointmentParams, services: services._id, specialist: worker._id});
    return appointment;
};
