import React from 'react';
import { notifyGuest } from '../actions/QueueActions.js';

export default class GuestTableEntryNotify extends React.Component {

  constructor(props) {
    super(props);
    this._notify = this._notify.bind(this);
  }

  _notify() {
    notifyGuest(this.props.id);
  }

  render() {
    let disabled;
    let glyph;
    let text;

    switch (this.props.status) {

    case 'new':
      text = 'Notify';
      glyph = 'comment';
      disabled = false;
      break;

    case 'notified':
      text = 'Notified';
      glyph = 'ok';
      disabled = true;
      break;

    default:
      // nothing
    }

    return (

      <button type="button"
        onClick={this._notify}
        disabled={disabled}
        className="btn btn-success btn-default">
        <span className={'glyphicon glyphicon-' + glyph}
          aria-hidden="true">
        </span>
        &nbsp;{text}
      </button>

    );
  }
}

GuestTableEntryNotify.propTypes = {
  id: React.PropTypes.number,
  status: React.PropTypes.string,
};

