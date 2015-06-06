// Libraries
var React = require('react');

// React components
var AddGuestButton = require('./AddGuestButton.jsx');
var AddGuestModal = require('./AddGuestModal.jsx');
var GuestTable = require('./GuestTable.jsx');
var Nav = require('./Nav.jsx');

var guestUrl = window.location.protocol + '/guest';

module.exports = React.createClass({

  getInitialState: function () {

    return {
      guests: [],
      now: new Date()
    };
  },

  componentDidMount: function() {
    $.get(guestUrl, function(guests) {
      if (this.isMounted()) {
        this.setState({guests: guests});
      }
    }.bind(this));

    this.timer = setInterval(this.setNow, 5000);

  },

  componentWillUnmount: function(){

    clearInterval(this.timer);
  },

  setNow: function() {

    this.setState(function (state) {
      state.now = new Date();
      return state;
    });

  },

  handleAddGuest: function (newGuest) {

      $.ajax({
        url: guestUrl,
        type: 'POST',
        data: newGuest,
        success: function (createdGuest) {

          // if adding guest to server was successful
          console.log('new guest data: ' + JSON.stringify(createdGuest));

          // update the local React state
          this.setState(function (state, props) {
            state.guests.push(createdGuest);
            state.now = new Date();
            return state;
          });

        }.bind(this),

        error: function (data, status, err) {

          console.error('error updating server' + JSON.stringify(data) + '\n' + status + '\n' + err);

        }

      });

  },

  render: function() {
    return (
      <div>
        <Nav />
        <AddGuestButton />
        <GuestTable guests={this.state.guests} now={this.state.now} />
        <AddGuestModal addGuest={this.handleAddGuest} />
      </div>
    );
  }
});
