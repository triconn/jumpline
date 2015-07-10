var React = require('react');

module.exports = React.createClass({

  render: function() {

    var g = this.props.guest;
    var entered = new Date(g.createdAt);
    // get the difference in milliseconds between when the customer was created
    // and now
    var millis = this.props.now - entered;
    // convert to minutes and round down
    var waited = Math.floor(millis/1000/60);
    // fix #1 where waited shows as -1 when  server time is slightly ahead of client time
    if (waited < 0) {
      waited = 0;
    }

    return (
      <tr>
        <td>{g.name}</td>
        <td>{waited}min
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
  }
});
