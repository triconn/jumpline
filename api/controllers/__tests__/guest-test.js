jest.autoMockOff();

describe('Guest Controller API', () => {

  const Hapi = require('hapi');
  const server = new Hapi.Server();
  const GuestController = require('../../controllers/guests.js');
  server.connection({ port: 80 });
  const route = {
    method: 'GET',
    path: '/guests',
    config: GuestController.index
  }
  server.route(route);

  it('GET / returns all guests', () => {
    const options = {
      method: 'GET',
      url: '/',
    }
    server.inject(options, (res) => {
      expect(res.statusCode).toBe(200);
      expect(res.payload.guests).toEqual([]);
    });
  });
});

