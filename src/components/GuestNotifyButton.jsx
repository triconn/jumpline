import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { notifyGuest } from '../reducers/queueActions.js'

class GuestNotifyButton extends React.Component {

  constructor (props) {

    super(props)
    this._notify = this._notify.bind(this)

  }

  _notify () {

    this.props.notifyGuest(this.props.id)

  }

  render () {

    let disabled
    let glyph
    let text

    if (this.props.status === 1) {

      text = 'Notify'
      glyph = 'comment'
      disabled = false

    }
    else if (this.props.status === 10
      || this.props.status === 100) {

      text = 'Notified'
      glyph = 'ok'
      disabled = true

    }

    return (

      <button
        type='button'
        onClick={this._notify}
        disabled={disabled}
        className='btn btn-success btn-default'
      >
        <span
          className={`glyphicon glyphicon-${glyph}`}
          aria-hidden='true'
        >
        </span>
        &nbsp;{text}
      </button>

    )

  }

}

GuestNotifyButton.propTypes = {
  id: React.PropTypes.string,
  notifyGuest: React.PropTypes.func,
  status: React.PropTypes.number,
}

function mapDispatchToProps (dispatch) {

  return bindActionCreators({
    notifyGuest,
  }, dispatch)

}

export default connect(null, mapDispatchToProps)(GuestNotifyButton)
