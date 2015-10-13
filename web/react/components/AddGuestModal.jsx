import React from 'react';
import { addGuest } from '../actions/QueueActions.js';

export default class AddGuestModal extends React.Component {

  constructor(props) {
    super(props);
    this._addGuest = this._addGuest.bind(this);
    this._catchEnter = this._catchEnter.bind(this);
    this._clearForm = this._clearForm.bind(this);
  }

  _addGuest() {
    const name = React.findDOMNode(this.refs.name).value.trim();
    const phone = React.findDOMNode(this.refs.phone).value.trim();
    const phoneRegex = /^\d{10}$/; // Phone must be 10 numeric digits only

    if (!name) {
      console.error('Name has no value');
    } else if (!phone) {
      console.error('Phone has no value');
    } else if (!phone.match(phoneRegex)) {
      console.error('Phone must be 10 digits (0-9)');
    } else {
      const newGuest = {
        'name': name,
        'phone': phone,
        'estimate': '10',
      };

      // update state
      console.log('Adding Guest: ' + JSON.stringify(newGuest));
      addGuest(newGuest);

      // cleanup
      this._clearForm();
      $('#AddGuestModal').modal('hide'); // eslint-disable-line no-undef
      document.querySelector('.btn-add-guest').blur();
    }
  }

  _catchEnter(event) {
    if (event.keyCode === 13) {
      this._addGuest();
    }
  }

  _clearForm() {
    React.findDOMNode(this.refs.name).value = '';
    React.findDOMNode(this.refs.phone).value = '';
  }

  render() {
    return (

      <div className="modal" id="AddGuestModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn btn-default pull-right"
                data-dismiss="modal"
                aria-label="Close"
                onClick={this._clearForm}>
                Close&nbsp;
                <span
                  className="glyphicon glyphicon-remove"
                  aria-hidden="true">
                </span>
              </button>
              <h4 className="modal-title">Add Guest</h4>
            </div>

            <div className="modal-body">
              <div className="container-fluid">
              <div className="row">
              <div className="col-md-10 col-md-offset-1">
                <form>
                  <br />
                  <div className="form-group">
                    <input
                      id="addGuestName"
                      ref="name"
                      type="text"
                      className="form-control input-lg"
                      placeholder="Name"
                      onKeyDown={this._catchEnter}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      ref="phone"
                      type="text"
                      className="form-control input-lg"
                      placeholder="Phone Number"
                      onKeyDown={this._catchEnter}
                    />
                  </div>
                </form>
              </div>
              </div>
              </div>
            </div>

            <div className="modal-footer">
              <div className="container-fluid">
              <div className="row">
              <div className="col-md-10 col-md-offset-1">
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  aria-label="Add"
                  onClick={this._addGuest}>
                  <span
                    className="glyphicon glyphicon-plus"
                    aria-hidden="true">
                  </span>
                  &nbsp;Add
                </button>
              </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

