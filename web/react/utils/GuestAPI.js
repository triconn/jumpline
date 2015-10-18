import { receiveAddGuest, receiveGetGuests, receiveNotifyGuest, receiveCompleteGuest } from '../actions/QueueServerActions.js';
import request from 'superagent';

export function add(guest) {
  const addGuestUrl = '/guests';

  request.post(addGuestUrl)
  .set('Content-Type', 'application/json')
  .send({ guest: guest })
  .end((err, res) => {
    if (err) return console.error(err);

    console.log('Created guest: ' + JSON.stringify(res.body));
    receiveAddGuest(res.body.guest);
  });
}

export function get() {
  const getGuestsUrl = '/guests';

  request.get(getGuestsUrl)
  .set('Accept', 'application/json')
  .end((err, res) => {
    if (err) return console.error(err);

    // console.log('All guests: ' + JSON.stringify(res.body.guests));
    receiveGetGuests(res.body.guests);
  });
}

export function notify(id) {
  const notifyGuestUrl = '/guests/' + id + '/notify';

  request.patch(notifyGuestUrl)
  .set('Accept', 'application/json')
  .end((err, res) => {
    if (err) return console.error(err);

    console.log('Notified guest: ' + JSON.stringify(res.body.guest));
    receiveNotifyGuest(res.body.guest);
  });
}

export function complete(id) {
  const completeGuestUrl = '/guests/' + id + '/complete';

  request.patch(completeGuestUrl)
  .set('Accept', 'application/json')
  .end((err, res) => {
    if (err) return console.error(err);

    console.log('Completed guest: ' + JSON.stringify(res.body.guest));
    receiveCompleteGuest(res.body.guest);
  });
}

