var React = require('react');

module.exports = React.createClass({

  handleAddGuest: function(e) {

    var name = React.findDOMNode(this.refs.name).value.trim();
    var phone = React.findDOMNode(this.refs.phone).value.trim();

    if (!name) {
      console.error('Name has no value');

    } else if (!phone) {
      console.error('Phone has no value');

    } else {
      // TODO: send request to the server
      this.clearForm();
      $('#AddGuestModal').modal('hide');
    }
  },

  clearForm: function() {
    React.findDOMNode(this.refs.name).value = '';
    React.findDOMNode(this.refs.phone).value = '';
  },

  render: function() {
    return (
      <div className="modal" id="AddGuestModal">
        <div className="modal-dialog">
          <div className="modal-content">


            <div className="modal-header">
              <button type="button" className="btn btn-default pull-right" data-dismiss="modal" aria-label="Close" onClick={this.clearForm}>
                Close&nbsp;
                <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
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
                    <input ref="name" type="text" className="form-control input-lg" placeholder="Name" />
                  </div>
                  <div className="form-group">
                    <input ref="phone" type="text" className="form-control input-lg" placeholder="Phone Number" />
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

                <button type="button" className="btn btn-primary btn-lg" aria-label="Add" onClick={this.handleAddGuest}>
                  <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
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
});
