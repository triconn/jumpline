import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { completeGuest } from '../reducers/queueActions.js';
import GuestNotifyButton from './GuestNotifyButton.jsx';

class GuestTableEntry extends React.Component {

  constructor(props) {
    super(props);
    this._tick = this._tick.bind(this);
    this._complete = this._complete.bind(this);
    this.state = {
      waited: 0,
    };
  }

  componentDidMount() {
    this._tick();
    this.interval = setInterval(this._tick, this.props.pollInterval);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  _complete() {
    this.props.completeGuest(this.props.guest.get('id'));
  }

  _tick() {
    const now = new Date();
    const created = new Date(this.props.guest.get('createdAt'));
    const milliseconds = now - created;
    const minutes = Math.floor( milliseconds / 60000 );

    // account from any server/client clock offset
    if (minutes > 0) {
      this.setState({ waited: minutes });
    } else {
      this.setState({ waited: 0 });
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
            id={this.props.guest.get('guestId')}
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
            Done
          </button>
        </td>
      </tr>

    )

  }

}

GuestTableEntry.propTypes = {
  guest: React.PropTypes.object,
  pollInterval: React.PropTypes.number,
}

function mapDispatchToProps (dispatch) {

  return bindActionCreators({
    completeGuest,
  }, dispatch)

}

export default connect(null, mapDispatchToProps)(GuestTableEntry)
