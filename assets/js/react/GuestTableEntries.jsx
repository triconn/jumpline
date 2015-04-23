var React = require('react');
var GuestTableEntry = require('./GuestTableEntry.jsx');

module.exports = React.createClass({

  render: function () {

    var rows = [];

    this.props.guests.forEach(function (guest) {
      rows.push(<GuestTableEntry key={guest.id} guest={guest} />);
    });

    return (
      <tbody>
        {rows}
      </tbody>
    );
  }
});
