var React = require('react');
var GuestTableEntry = require('./GuestTableEntry.jsx');

module.exports = React.createClass({
  render: function() {
    var rows = [];
    var guestData = [{
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
    }];

    guestData.forEach(function (guest) {
      rows.push(<GuestTableEntry guest={guest} />);
    });

    return (
      <tbody>
        {rows}
      </tbody>
    );
  }
});
