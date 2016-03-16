import Debug from 'debug';
import request from 'superagent';

const log = Debug('iq:iqueue');

export default class iQueue {

  constructor() {
    // Set API URL
    this.url = process.env.IQUEUE_API_URL
      || `https://api.iqueue.io/graphql`;

    log('IQUEUE_API_URL:', this.url);

    // Bind methods
    this.query = this.query.bind(this);
  }


  query(queryString) {

    return new Promise((resolve, reject) => {

      request.post(this.url)
      .set('Content-Type', 'application/json')
      .send(queryString)
      .end((error, res) => {

        if (error) {
          return reject(new Error(error));
        }

        log('GraphQL response:', res.body);
        return resolve(res.body);
      });

    });

  }


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
          return reject(err);
        }

        log('Completed guest:', res.body);
        return resolve(res.body);
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
