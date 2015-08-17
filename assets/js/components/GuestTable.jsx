var React = require('react');
var GuestTableEntries = require('./GuestTableEntries.jsx');
require('../../styles/components/GuestTable.css');

module.exports = React.createClass({
  render: function() {
    return (
      <div className="bs-example" data-example-id="table-within-panel">
        <div className="panel panel-default">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Guest</th>
                <th>Waited
                  <span className="greyText">/ Quoted</span>
                </th>
                <th> </th>
                <th> </th>
              </tr>
            </thead>
            <GuestTableEntries />
          </table>
        </div>
      </div>
    );
  }
});
