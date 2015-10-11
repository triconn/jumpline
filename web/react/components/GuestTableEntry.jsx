import React from 'react';
import NotifyButton from './GuestTableEntryNotify.jsx';
import { completeGuest } from '../actions/QueueActions.js';

export default class GuestTableEntry extends React.Component {

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
    completeGuest(this.props.guest.id);
  }

  _tick() {
    const now = new Date();
    const created = new Date(this.props.guest.createdAt);
    const milliseconds = now - created;
    const minutes = Math.floor( milliseconds / 60000 );

    // account from any server/client clock offset
    if (minutes > 0) {
      this.setState({ waited: minutes });
    } else {
      this.setState({ waited: 0 });
    }
  }

  render() {
    return (

      <tr>
        <td>{this.props.guest.name}</td>
        <td>{this.state.waited}min
          <span className="greyText">/ {this.props.guest.estimate}min</span>
        </td>
        <td>
          <NotifyButton
            id={this.props.guest.id}
            status={this.props.guest.status}
          />
        </td>
        <td>
          <button type="button"
            onClick={this._complete}
            className="btn btn-info btn-default">
            <span className="glyphicon glyphicon-check" aria-hidden="true"></span> Done
          </button>
        </td>
      </tr>

    );
  }
}

GuestTableEntry.propTypes = {
  guest: React.PropTypes.object,
  pollInterval: React.PropTypes.number,
};

