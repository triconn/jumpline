var React = require('react');
var QueueActions = require('../actions/QueueActions.js');

module.exports = React.createClass({

  render: function() {

    var text, glyph, disabled;

    switch(this.props.status) {

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
    };

    return (
      <button type="button"
        onClick={this._notify}
        disabled={disabled}
        className="btn btn-success btn-default">
        <span className={"glyphicon glyphicon-" + glyph}
          aria-hidden="true">
        </span>
        &nbsp;{text}
      </button>
    );

  },

  _notify: function() {

    QueueActions.notifyGuest(this.props.id);

  }

});

