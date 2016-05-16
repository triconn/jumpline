import Debug from 'debug'
import request from 'superagent'

const log = Debug('jl:iqueue')

export default class iQueue {

  constructor () {

    // Set API URL
    this.url = process.env.IQUEUE_API_URL
      || 'https://api.iqueue.io/graphql'

    log('IQUEUE_API_URL:', this.url)

    this.token = 'abc123token'

    // Bind methods
    this.query = this.query.bind(this)
    this._composeQuery = this._composeQuery.bind(this)
    this._composeMutation = this._composeMutation.bind(this)

  }


  _composeQuery (query, array) {

    const string = `{ viewer(token: "${this.token}") {`
                   + ` ${query} { ${array.join(' ')} }}}`
    return string

  }

  _composeMutation (query, newObject, array) {

    const string = `mutation M { ${query}(`
                        + ` token: "${this.token}"`
                        + ` name: "${newObject.name}"`
                        + ` phone: "${newObject.phone}") {`
                        + ` ${array.join(' ')} } }`
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

      log('query:', escaped)
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


  addGuest (newGuest, returnFields) {

    if (!returnFields instanceof Array) {

      return new Error('Second arg should be an array of return fields')

    }
    const queryString = 'mutation M { addGuest('
                        + ` token: "${this.token}"`
                        + ` name: "${newGuest.name}"`
                        + ` phone: "${newGuest.phone}") {`
                        + ` ${returnFields.join(' ')} } }`
    return this.query(queryString)

  }


  completeGuest (guestId, returnFields) {

    if (!returnFields instanceof Array) {

      return new Error('Second arg should be an array of return fields')

    }
    const queryString = 'mutation M { completeGuest('
                        + ` token: "${this.token}"`
                        + ` guestId: "${guestId}"`
                        + ') {'
                        + ` ${returnFields.join(' ')} } }`
    return this.query(queryString)

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
      'currentGuests',
      args
    )
    return this.query(queryString)

  }


  notifyGuest (guestId, returnFields) {

    if (!returnFields instanceof Array) {

      return new Error('Second arg should be an array of return fields')

    }
    const queryString = 'mutation M { notifyGuest('
                        + ` token: "${this.token}"`
                        + ` guestId: "${guestId}"`
                        + ') {'
                        + ` ${returnFields.join(' ')} } }`
    return this.query(queryString)

  }

}
