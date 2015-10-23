import React from 'react';
import QueueStore from '../stores/QueueStore.js';
import { ViewFilters } from '../utils/Constants.js';
import { getGuests } from '../actions/QueueActions.js';
import GuestTableEntry from './GuestTableEntry.jsx';

export default class GuestTableEntries extends React.Component {

  constructor(props) {
    super(props);
    this._onChange = this._onChange.bind(this);
    this._selectGuests = this._selectGuests.bind(this);
    this._setGuestFilter = this._setGuestFilter.bind(this);
    this.state = {
      queue: QueueStore.getQueue(),
      viewFilter: ViewFilters.CURRENT_GUESTS,
    };
  }

  componentDidMount() {
    QueueStore.addChangeListener(this._onChange);
    getGuests();
  }

  componentWillUnmount() {
    QueueStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState({
      queue: QueueStore.getQueue(),
      viewFilter: this.state.viewFilter,
    });
  }

  _selectGuests() {
    return {
      guests: this._setGuestFilter(this.state.queue.guests,
                                   this.state.viewFilter),
    };
  }

  _setGuestFilter(guests, filter) {
    switch (filter) {
    case ViewFilters.CURRENT_GUESTS:
      return guests.filter((guest) => {
        return guest.status !== 'completed';
      });
    }
  }

  render() {
    let rows = [];
    const view = this._selectGuests();

    if (view.guests) {
      view.guests.forEach((guest) => {
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

