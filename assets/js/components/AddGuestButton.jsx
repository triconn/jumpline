var React = require('react');
require('../../styles/components/AddGuestButton.css');

module.exports = React.createClass({

  focusOnNameInput: function() {
    document.getElementById('addGuestName').focus();
  },

  render: function() {
    return (
      <button type="button" className="btn-add-guest btn btn-default btn-lg" data-toggle="modal" data-target="#AddGuestModal" onClick={this.focusOnNameInput}>
        <span className="glyphicon glyphicon-plus" aria-hidden="true"></span> Add New
      </button>
    );
  }
});
