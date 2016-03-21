import Debug from 'debug';
import React from 'react';
import { Link } from 'react-router';

const log = Debug('iq:google');

class Login extends React.Component {

  _handleGoogle() {
    window.location = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&access_type=offline&client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${escape(process.env.GOOGLE_REDIRECT_URL)}&scope=${escape(`email`)}`;
  }

  render() {
    return (

      <div>
        Login page
        <div
          className="btn btn-primary"
          onClick={this._handleGoogle}
        >
          Login with Google
        </div>
      </div>

    );
  }

}

export default Login;
