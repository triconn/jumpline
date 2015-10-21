import {
  receiveAddGuest,
  receiveGetGuests,
  receiveNotifyGuest,
  receiveCompleteGuest,
} from '../actions/QueueServerActions.js';
import request from 'superagent';

export function addGuest(guest) {
  request.post(`/guests`)
  .set('Content-Type', 'application/json')
  .send({ guest: guest })
  .end((err, res) => {
    if (err) return console.error(err);

    console.log('Created guest: ' + JSON.stringify(res.body));
    receiveAddGuest(res.body.guest);
  });
}

export function completeGuest(id) {
  request.patch(`/guests/${id}/complete`)
  .set('Accept', 'application/json')
  .end((err, res) => {
    if (err) return console.error(err);

    console.log('Completed guest: ' + JSON.stringify(res.body.guest));
    receiveCompleteGuest(res.body.guest);
  });
}

export function getAllGuests() {
  request.get(`/guests`)
  .set('Accept', 'application/json')
  .end((err, res) => {
    if (err) return console.error(err);

    receiveGetGuests(res.body.guests);
  });
}

export function notifyGuest(id) {
  request.patch(`/guests/${id}/notify`)
  .set('Accept', 'application/json')
  .end((err, res) => {
    if (err) return console.error(err);

    console.log('Notified guest: ' + JSON.stringify(res.body.guest));
    receiveNotifyGuest(res.body.guest);
  });
}

