import Debug from 'debug';
import request from 'superagent';

const log = Debug('iq:iqueue');

export default class iQueue {

  addGuest(guest) {
    request.post(`/guests`)
    .set('Content-Type', 'application/json')
    .send({ guest: guest })
    .end((err, res) => {

      if (err) {
        throw err;
      }

      log('Created guest:', JSON.stringify(res.body));
      return res.body;
    });
  }

  completeGuest(id) {
    request.patch(`/guests/${id}/complete`)
    .set('Accept', 'application/json')
    .end((err, res) => {

      if (err) {
        throw err;
      }

      log('Completed guest: ' + JSON.stringify(res.body));
      return res.body;
    });
  }

  getAllGuests() {
    request.get(`/guests`)
    .set('Accept', 'application/json')
    .end((err, res) => {

      if (err) {
        throw err;
      }

      return res.body;
    });
  }

  notifyGuest(id) {
    request.patch(`/guests/${id}/notify`)
    .set('Accept', 'application/json')
    .end((err, res) => {

      if (err) {
        throw err;
      }

      log('Notified guest: ' + JSON.stringify(res.body));
      return res.body;
    });
  }
}
