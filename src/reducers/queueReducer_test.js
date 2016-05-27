import Code from 'code'
import { fromJS, List } from 'immutable'
import Lab from 'lab'

// Test shortcuts
const lab = exports.lab = Lab.script()
const describe = lab.describe
const it = lab.it
const expect = Code.expect

// SUT
import reducer from './queueReducer.js'

describe('queue reducer', () => {

  it('returns the given state by default', (done) => {

    const state = { state: 'mystate' }
    expect(

      reducer(state, {
        type: 'SOME_OTHER_ACTION',
      })

    ).to.equal(state)
    done()

  })

  it('inits with immutable List initial state', (done) => {

    expect(

      reducer(undefined, {})
      .equals(List())

    ).to.be.true()
    done()

  })

  it('stores a new guest on ADD_GUEST_SUCCESS', (done) => {

    const newGuest = {
      name: 'Aaron',
      phone: '1231232134',
    }

    expect(

      reducer(undefined, {
        type: 'ADD_GUEST_SUCCESS',
        guest: newGuest,
      })
      .equals(List().push(fromJS(newGuest)))

    ).to.be.true()
    done()

  })

  it('stores all new guests on GET_GUESTS_SUCCESS', (done) => {

    const newGuests = [
      {
        name: 'Guest One',
        phone: '1231231234',
      },
      {
        name: 'Guest Two',
        phone: '1231231235',
      },
    ]

    expect(

      reducer(undefined, {
        type: 'GET_GUESTS_SUCCESS',
        guests: newGuests,
      })
      .equals(fromJS(newGuests))

    ).to.be.true()
    done()

  })

  it('GET_GUESTS_SUCCESS replaces all existing state', (done) => {

    const existingGuests = [
      {
        name: 'Existing Guest',
        phone: '4324324322',
      },
    ]
    const newGuests = [
      {
        name: 'Guest One',
        phone: '1231231234',
      },
      {
        name: 'Guest Two',
        phone: '1231231235',
      },
    ]

    expect(

      reducer(existingGuests, {
        type: 'GET_GUESTS_SUCCESS',
        guests: newGuests,
      })
      .equals(fromJS(newGuests))

    ).to.be.true()
    done()

  })

  it('NOTIFY_GUEST_SUCCESS replaces existing guest'
     + ' with notified one', (done) => {

    const existingGuest = {
      name: 'Aaron',
      phone: '1231232134',
      status: 1,
      guestId: 'abc12',
    }
    const notifiedGuest = {
      name: 'Aaron',
      phone: '1231232134',
      status: 10,
      guestId: 'abc12',
    }

    expect(

      reducer(List().push(fromJS(existingGuest)), {
        type: 'NOTIFY_GUEST_SUCCESS',
        guest: notifiedGuest,
      })
      .equals(List().push(fromJS(notifiedGuest)))

    ).to.be.true()
    done()

  })

  it('stores a new guest on COMPLETE_GUEST_SUCCESS', (done) => {

    const newGuest = {
      name: 'Aaron',
      phone: '1231232134',
    }

    expect(

      reducer(undefined, {
        type: 'COMPLETE_GUEST_SUCCESS',
        guest: newGuest,
      })
      .equals(List().push(fromJS(newGuest)))

    ).to.be.true()
    done()

  })


})
