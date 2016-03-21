import React from 'react';
import { Link } from 'react-router';

class LogoutButton extends React.Component {

  _handleLogout() {
    delete localStorage.token;
  }

  render() {
    return (

      <button
        className="btn btn-default"
        onClick={this._handleLogout}
      >
        <Link
          to={`/login`}
        >
          Logout
        </Link>
      </button>

    );
  }
}

export default LogoutButton;
