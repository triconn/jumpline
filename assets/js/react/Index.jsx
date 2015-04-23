// Libraries
var React = require('react');

// React components
var AddGuestButton = require('./AddGuestButton.jsx');
var AddGuestModal = require('./AddGuestModal.jsx');
var GuestTable = require('./GuestTable.jsx');
var Nav = require('./Nav.jsx');

module.exports = React.createClass({

  getInitialState: function () {

    return {
      guests: [{
        'id': 1,
        'guest': 'Mark Smith',
        'waited': '7',
        'quoted': '10'
      }, {
        'id': 2,
        'guest': 'Jill Smith',
        'waited': '5',
        'quoted': '15'
      }, {
        'id': 3,
        'guest': 'Larry Smith',
        'waited': '4',
        'quoted': '15'
      }]
    };
  },

  handleAddGuest: function (newGuest) {
    this.setState(function (state, props) {
      
      state.guests.push(newGuest);
      return state;
    });
  },

  render: function() {
    return (
      <div>
        <Nav />
        <AddGuestButton />
        <GuestTable guests={this.state.guests} />
        <AddGuestModal addGuest={this.handleAddGuest} totalGuests={this.state.guests.length} />
      </div>
    );
  }
});
