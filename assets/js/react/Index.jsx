var React = require('react');
var Nav = require('./Nav.jsx');
var AddGuest = require('./AddGuest.jsx');
var GuestTable = require('./GuestTable.jsx');

module.exports = React.createClass({
  render: function() {
    return (
      <div className="Main">
        <Nav />
        <AddGuest />
        <GuestTable />
      </div>
    );
  }
});
