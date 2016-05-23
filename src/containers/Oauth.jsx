import React from 'react'
import Jumpline from '../helpers/iqueue.js'


class Oauth extends React.Component {

  constructor () {

    super()
    this._handleCallback = this._handleCallback.bind(this)

  }

  componentDidMount () {

    this._handleCallback()

  }

  _handleCallback () {

    const { query } = this.props.location
    if (query.code) {

      // Google Oauth2 callback
      const googleLoginQuery = `
        mutation M {
          login(
            code: "${query.code}",
            provider: "google",
          ) {
            accessCode,
          }
        }
      `
      return new Jumpline().query(googleLoginQuery)
      .then((data) => {

      })
      .catch((error) => {

        console.error(error)

      })

    }

  }

  render () {

    return (
      <div>
        Login page
        <div
          className='btn btn-primary'
          onClick={this._handleGoogle}
        >
          Login with Google
        </div>
      </div>
    )

  }

}

Oauth.propTypes = {
  location: {
    query: React.PropTypes.object,
  },
}

export default Oauth
