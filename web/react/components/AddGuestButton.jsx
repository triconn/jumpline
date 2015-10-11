import React from 'react';
import '../../styles/components/AddGuestButton.css';

export default class AddGuestButton extends React.Component {

  focusOnNameInput() {
    document.getElementById('addGuestName').focus();
  }

  render() {
    return (

      <button
        type="button"
        className="btn-add-guest btn btn-default btn-lg"
        data-toggle="modal"
        data-target="#AddGuestModal"
        onClick={this.focusOnNameInput}>
        <span
          className="glyphicon glyphicon-plus"
          aria-hidden="true">
        </span> Add New
      </button>

    );
  }
}

