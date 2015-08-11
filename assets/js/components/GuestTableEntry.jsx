var React = require('react');
var NotifyButton = require('./GuestTableEntryNotify.jsx');

module.exports = React.createClass({

  getInitialState: function() {

    return {
      waited: 0
    }
  },

  componentDidMount: function() {
    this._tick();
    this.interval = setInterval(this._tick, this.props.pollInterval);
  },

  componentWillUnmount: function() {
    clearInterval(this.interval);
  },

  render: function() {

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
          <button type="button" className="btn btn-info btn-default">
            <span className="glyphicon glyphicon-check" aria-hidden="true"></span> Done
          </button>
        </td>
      </tr>
    );
  },

  _tick: function() {

    var now = new Date();
    var created = new Date(this.props.guest.createdAt);
    var milliseconds = now - created;
    var minutes = Math.floor(milliseconds/60000);

    //account from any server/client clock offset
    if(minutes > 0) {

      this.setState({ waited: minutes });

    } else {

      this.setState({ waited: 0 });

    };

  }
});

