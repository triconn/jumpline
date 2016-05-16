import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { completeGuest } from '../reducers/queueActions.js'
import GuestNotifyButton from './GuestNotifyButton.jsx'

class GuestTableEntry extends React.Component {

  constructor (props) {

    super(props)
    this._tick = this._tick.bind(this)
    this._complete = this._complete.bind(this)
    this.state = {
      waited: 0,
      returnFields: [
        'guestId',
        'name',
        'phone',
        'estimate',
        'size',
        'status',
        'estimatedAt',
        'createdAt',
        'updatedAt',
      ],
    }

  }

  componentDidMount () {

    this._tick()
    this.interval = setInterval(this._tick, this.props.pollInterval)

  }

  componentWillUnmount () {

    clearInterval(this.interval)

  }

  _complete () {

    this.props.completeGuest(
      this.props.guest.get('guestId'),
      this.state.returnFields
    )

  }

  _tick () {

    const now = new Date()
    const created = new Date(this.props.guest.get('createdAt'))
    const milliseconds = now - created
    const minutes = Math.floor(milliseconds / 60000)

    // account from any server/client clock offset
    if (minutes > 0) {

      this.setState({ waited: minutes })

    }
    else {

      this.setState({ waited: 0 })

    }

  }

  render () {

    const disabled = this.props.guest.get('status') === 'completed'

    return (

      <tr>
        <td>
          {this.props.guest.get('name')}
        </td>
        <td>
          {this.state.waited}min
          <span className='greyText'>/
            {this.props.guest.get('estimate')}min
          </span>
        </td>
        <td>
          <GuestNotifyButton
            guestId={this.props.guest.get('guestId')}
            phone={this.props.guest.get('phone')}
            returnFields={this.state.returnFields}
            status={this.props.guest.get('status')}
          />
        </td>
        <td>
          <button
            type='button'
            disabled={disabled}
            onClick={this._complete}
            className='btn btn-info btn-default'
          >
            <span
              className='glyphicon glyphicon-check'
              aria-hidden='true'
            >
            </span>
            &nbsp;Done
          </button>
        </td>
      </tr>

    )

  }

}

GuestTableEntry.propTypes = {
  completeGuest: React.PropTypes.func,
  guest: React.PropTypes.object,
  pollInterval: React.PropTypes.number,
}

function mapDispatchToProps (dispatch) {

  return bindActionCreators({
    completeGuest,
  }, dispatch)

}

export default connect(null, mapDispatchToProps)(GuestTableEntry)
