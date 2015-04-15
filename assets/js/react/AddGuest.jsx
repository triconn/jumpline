var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <button type="button" className="btn-add-guest btn btn-default btn-lg">
        <span className="glyphicon glyphicon-plus" aria-hidden="true"></span> Add New
      </button>
    );
  }
});
