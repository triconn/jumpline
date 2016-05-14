import Debug from 'debug'
import request from 'superagent'

const log = Debug('jl:iqueue')

export default class iQueue {

  constructor () {

    // Set API URL
    this.url = process.env.IQUEUE_API_URL
      || 'https://api.iqueue.io/graphql'

    log('IQUEUE_API_URL:', this.url)

    // Bind methods
    this.query = this.query.bind(this)
    this._composeQuery = this._composeQuery.bind(this)

  }


  _composeQuery (token, query, array) {

    const string = `{ viewer(token: "${token}") {`
                   + ` ${query} { ${array.join(' ')} }}}`
    log('query:', string)
    return string

  }

  /**
   * Send a custom query to the Jumpline GraphQL API
   *
   * @public
   * @param {string} queryString The GraphQL string query
   * @returns {Promise} A Promise with the response data or error message
   */
  query (queryString) {

    return new Promise((resolve, reject) => {

      const escaped = queryString.replace(/"/g, '\\"')

      request.post(this.url)
      .set('Content-Type', 'application/json')
      .send(`{ "query": "${escaped}" }`)
      .end((error, res) => {

        if (error) {

          log('error:', res.body.errors)
          return reject(res.body.errors[0].message)

        }

        log('GraphQL response:', res.body.data)
        return resolve(res.body.data)

      })

    })

  }


  addGuest (guest) {

    return new Promise((resolve, reject) => {

      request.post('/guests')
      .set('Content-Type', 'application/json')
      .send({ guest })
      .end((err, res) => {

        if (err) return reject(err)

        log('Created guest:', res.body)
        return resolve(res.body)

      })

    })

  }


  completeGuest (id) {

    return new Promise((resolve, reject) => {

      request.patch(`/guests/${id}/complete`)
      .set('Accept', 'application/json')
      .end((err, res) => {

        if (err) return reject(err)

        log('Completed guest:', res.body)
        return resolve(res.body)

      })

    })

  }


  /**
   * Get all current guests in the queue
   *
   * @public
   * @param {string} ...args One or more string arguments representing
   * the Guest attributes that should be returned
   * @returns {Promise}
   */
  getGuests (...args) {

    const queryString = this._composeQuery(
      'abc123token',
      'currentGuests',
      args
    )
    return this.query(queryString)

  }


  notifyGuest (id) {

    return new Promise((resolve, reject) => {

      request.patch(`/guests/${id}/notify`)
      .set('Accept', 'application/json')
      .end((err, res) => {

        if (err) return reject(err)

        log('Notified guest:', res.body)
        return resolve(res.body)

      })

    })

  }

}
