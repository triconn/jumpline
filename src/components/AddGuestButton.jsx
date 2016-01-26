import React from 'react';
import './AddGuestButton.css';

export default class AddGuestButton extends React.Component {

  _handleClick() {
    $('#AddGuestModal').modal(); // eslint-disable-line no-undef
    document.getElementById('addGuestName').focus();
  }

  render() {
    return (

      <button
        type="button"
        className="btn-add-guest btn btn-default btn-lg"
        onClick={this._handleClick}>
        <span
          className="glyphicon glyphicon-plus"
          aria-hidden="true">
        </span> Add New
      </button>

    );
  }
}

