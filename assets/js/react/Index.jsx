// Libraries
var React = require('react');

// React components
var AddGuestButton = require('./AddGuestButton.jsx');
var AddGuestModal = require('./AddGuestModal.jsx');
var GuestTable = require('./GuestTable.jsx');
var Nav = require('./Nav.jsx');

module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <Nav />
        <AddGuestButton />
        <GuestTable />
        <AddGuestModal />
      </div>
    );
  }
});
