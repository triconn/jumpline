var React = require('react');

module.exports = React.createClass({

  getInitialState: function() {

    return {
      waited: 0
    }
  },

  componentDidMount: function() {
    this._tick();
    setInterval(this._tick, this.props.pollInterval);
  },

  render: function() {

    var g = this.props.guest;
    return (
      <tr>
        <td>{g.name}</td>
        <td>{this.state.waited}min
          <span className="greyText">/ {g.estimate}min</span>
        </td>
        <td>
          <button type="button" className="btn btn-success btn-default">
            <span className="glyphicon glyphicon-comment" aria-hidden="true"></span> Notify
          </button>
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

    this.setState({ waited: minutes });
  }

});

