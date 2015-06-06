var React = require('react');

module.exports = React.createClass({

  focusOnNameInput: function() {
    $('#addGuestName').focus();
  },

  render: function() {
    return (
      <button type="button" className="btn-add-guest btn btn-default btn-lg" data-toggle="modal" data-target="#AddGuestModal" onClick={this.focusOnNameInput}>
        <span className="glyphicon glyphicon-plus" aria-hidden="true"></span> Add New
      </button>
    );
  }
});
