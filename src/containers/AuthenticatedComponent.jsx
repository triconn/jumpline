import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

export function requireAuthentication(Component) {

  class AuthenticatedComponent extends React.Component {

    constructor() {
      super();
      this._checkAuth = this._checkAuth.bind(this);
    }

    componentWillMount() {
      this._checkAuth(this.props.isAuthenticated);
    }

    componentWillReceiveProps(nextProps) {
      this._checkAuth(nextProps.isAuthenticated);
    }

    _checkAuth(isAuthenticated) {
      if (!isAuthenticated) {
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
    token: state.auth.token,
    userName: state.auth.userName,
    isAuthenticated: state.auth.isAuthenticated,
  });

  return connect(mapStateToProps)(AuthenticatedComponent);

}
