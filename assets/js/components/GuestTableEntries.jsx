var React = require('react');
var QueueStore = require('../stores/QueueStore.js');
var QueueActions = require('../actions/QueueActions.js');
var GuestTableEntry = require('./GuestTableEntry.jsx');

module.exports = React.createClass({

  getInitialState: function() {
    return QueueStore.getQueue();
  },

  componentDidMount: function() {
    QueueStore.addChangeListener(this._onChange);
    QueueActions.getGuests();
  },

  componentWillUnmount: function(){
    QueueStore.removeChangeListener(this._onChange);
  },

  render: function () {

    var rows = [];

    if(this.state.guests) {

      this.state.guests.forEach(function (guest) {

        rows.push(<GuestTableEntry key={guest.id} guest={guest} pollInterval={5000} />);
      });
    }

    return (
      <tbody>
        {rows}
      </tbody>
    );
  },

  _onChange: function() {
    this.setState(QueueStore.getQueue());
  }
});

