import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProvidersAppointmentsService from './ListProvidersAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProvidersAppointments: ListProvidersAppointmentsService;

describe('ListProvidersAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProvidersAppointments = new ListProvidersAppointmentsService(
      fakeAppointmentsRepository
    );
  });
  it('should be able to list the appointments on a specific day', async () => {
    const appointmentOne = await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });

    const appointmentTwo = await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    const appointments = await listProvidersAppointments.execute({
      provider_id: 'user',
      year: 2020,
      month: 5,
      day: 20,
    });

    expect(appointments).toEqual([appointmentOne, appointmentTwo]);
  });
});
