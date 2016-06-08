import React from 'react'


class Login extends React.Component {

  _handleGoogle () {

    window.location = `${window.location.origin}/auth/google/redirect`

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

export default Login
