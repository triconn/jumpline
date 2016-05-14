import Debug from 'debug'
import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

const log = Debug('jl:auth')

export function requireAuthentication (Component) {

  class AuthenticatedComponent extends React.Component {

    constructor () {

      super()
      this._checkAuth = this._checkAuth.bind(this)
      this.state = {
        isAuthenticated: false,
      }

    }

    componentWillMount () {

      this._checkAuth(this.props.auth)

    }

    componentWillReceiveProps (nextProps) {

      this._checkAuth(nextProps.auth)

    }

    _checkAuth (auth) {

      if (auth.get('token') === '') {

        log('Empty auth token. Redirecting from'
            + ` '${this.props.location.pathname}' to '/login'`)
        return this.props.dispatch(push('/login'))

      }
      return this.setState({ isAuthenticated: true })

    }

    render () {

      if (this.state.isAuthenticated === true) {

        return (
          <Component {...this.props} />
        )

      }
      return (

        <div>
        </div>

      )

    }
  }

  AuthenticatedComponent.propTypes = {
    auth: React.PropTypes.object,
    dispatch: React.PropTypes.func,
    isAuthenticated: React.PropTypes.bool,
    location: React.PropTypes.object,
  }

  const mapStateToProps = (state) => {

    return {
      auth: state.auth,
    }

  }

  return connect(mapStateToProps)(AuthenticatedComponent)

}
