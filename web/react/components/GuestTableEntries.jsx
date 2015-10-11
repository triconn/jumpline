import React from 'react';
import QueueStore from '../stores/QueueStore.js';
import { getGuests } from '../actions/QueueActions.js';
import GuestTableEntry from './GuestTableEntry.jsx';

export default class GuestTableEntries extends React.Component {

  constructor(props) {
    super(props);
    this._onChange = this._onChange.bind(this);
    this.state = QueueStore.getQueue();
  }

  componentDidMount() {
    QueueStore.addChangeListener(this._onChange);
    getGuests();
  }

  componentWillUnmount() {
    QueueStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState(QueueStore.getQueue());
  }

  render() {
    let rows = [];

    if (this.state.guests) {
      this.state.guests.forEach((guest) => {
        rows.push(
          <GuestTableEntry
            key={guest.id}
            guest={guest}
            pollInterval={5000}
          />
        );
      });
    }

    return (

      <tbody>
        {rows}
      </tbody>

    );
  }
}

