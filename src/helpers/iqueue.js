import Debug from 'debug';
import request from 'superagent';

const log = Debug('iq:iqueue');

export default class iQueue {

  addGuest(guest) {

    return new Promise((resolve, reject) => {

      request.post(`/guests`)
      .set('Content-Type', 'application/json')
      .send({ guest, })
      .end((err, res) => {

        if (err) {
          return reject(err);
        }

        log('Created guest:', res.body);
        return resolve(res.body);
      });

    });

  }

  completeGuest(id) {

    return new Promise((resolve, reject) => {

      request.patch(`/guests/${id}/complete`)
      .set('Accept', 'application/json')
      .end((err, res) => {

        if (err) {
          throw err;
        }

        log('Completed guest:', res.body);
        return res.body;
      });

    });

  }

  getGuests() {

    return new Promise((resolve, reject) => {

      request.get(`/guests`)
      .set('Accept', 'application/json')
      .end((err, res) => {

        if (err) {
          return reject(err);
        }

        log('Got guests:', res.body);
        return resolve(res.body);
      });

    });

  }

  notifyGuest(id) {

    return new Promise((resolve, reject) => {

      request.patch(`/guests/${id}/notify`)
      .set('Accept', 'application/json')
      .end((err, res) => {

        if (err) {
          return reject(err);
        }

        log('Notified guest:', res.body);
        return resolve(res.body);
      });

    });

  }
}
