var React = require('react');
var GuestTableTitle = require('./GuestTableTitle.jsx');
var GuestTableEntries = require('./GuestTableEntries.jsx');

module.exports = React.createClass({
  render: function() {
    return (
      <div className="bs-example" data-example-id="table-within-panel">
        <div className="panel panel-default">
          <table className="table table-striped">
            <GuestTableTitle />
            <GuestTableEntries />
          </table>
        </div>
      </div>
    );
  }
});
