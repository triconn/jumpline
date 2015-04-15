var React = require('react');

module.exports = React.createClass({
  render: function() {

    var entry = this.props.guest;

    return (
      <tr>
        <td>{entry.guest}</td>
        <td>{entry.waited}min
          <span className="greyText">/ {entry.quoted}min</span>
        </td>
        <td>
          <button type="button" className="btn btn-success btn-lg">
            <span className="glyphicon glyphicon-comment" aria-hidden="true"></span> Notify
          </button>
        </td>
        <td>
          <button type="button" className="btn btn-info btn-lg">
            <span className="glyphicon glyphicon-check" aria-hidden="true"></span> Done
          </button>
        </td>
      </tr>
    );
  }
});
