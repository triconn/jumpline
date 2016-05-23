import Code from 'code'
import { Map } from 'immutable'
import Lab from 'lab'

// Test shortcuts
const lab = exports.lab = Lab.script()
const describe = lab.describe
const it = lab.it
const expect = Code.expect

// SUT
import reducer from './authReducer.js'

describe('auth reducer', () => {

  it('inits with expected initial state', (done) => {

    expect(

      reducer(undefined, {})
      .equals(Map({
        loginInProgress: false,
        token: '',
      }))

    ).to.be.true()
    done()

  })

  it('stores token on initial LOGIN_SUCCESS', (done) => {

    expect(

      reducer(undefined, {
        type: 'LOGIN_SUCCESS',
        token: 'abc',
      })
      .equals(Map({
        loginInProgress: false,
        token: 'abc',
      }))

    ).to.be.true()
    done()

  })

  it('stores token on subsequent LOGIN_SUCCESS', (done) => {

    expect(

      reducer(Map({
        loginInProgress: false,
        token: 'abc',
      }), {
        type: 'LOGIN_SUCCESS',
        token: 'def',
      })
      .equals(Map({
        loginInProgress: false,
        token: 'def',
      }))

    ).to.be.true()
    done()

  })

})
