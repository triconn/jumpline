import Debug from 'debug';
import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

const log = Debug('jl:auth');

export function requireAuthentication(Component) {

  class AuthenticatedComponent extends React.Component {

    constructor() {
      super();
      this._checkAuth = this._checkAuth.bind(this);
    }

    componentWillMount() {
      this._checkAuth(this.props.auth);
    }

    componentWillReceiveProps(nextProps) {
      this._checkAuth(nextProps.auth);
    }

    _checkAuth(auth) {
      if (auth.get('token') === '') {
        log(`Empty auth token. Redirecting from '${this.props.location.pathname}' to '/login'`);
        this.props.dispatch(push(`/login`));
      }
    }

    render() {

      let whatToRender = null;
      if (this.props.isAuthenticated === true) {
        whatToRender = <Component {...this.props} />;
      }

      return (

        <div>
          {whatToRender}
        </div>

      );
    }
  }

  const mapStateToProps = (state) => ({
    auth: state.auth,
  });

  return connect(mapStateToProps)(AuthenticatedComponent);

}
