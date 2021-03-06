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

    this.props.notifyGuest(this.props.guestId, this.props.returnFields)

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
        alt={this.props.phone}
        className='btn btn-success btn-default'
      >
        <span
          className={`glyphicon glyphicon-${glyph}`}
          alt={this.props.phone}
          aria-hidden='true'
        >
        </span>
        &nbsp;{text}
      </button>

    )

  }

}

GuestNotifyButton.propTypes = {
  guestId: React.PropTypes.string,
  phone: React.PropTypes.string,
  notifyGuest: React.PropTypes.func,
  returnFields: React.PropTypes.array,
  status: React.PropTypes.number,
}

function mapDispatchToProps (dispatch) {

  return bindActionCreators({
    notifyGuest,
  }, dispatch)

}

export default connect(null, mapDispatchToProps)(GuestNotifyButton)
