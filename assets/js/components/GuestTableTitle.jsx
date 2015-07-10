var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <thead>
        <tr>
          <th>Guest</th>
          <th>Waited
            <span className="greyText">/Quoted</span>
          </th>
          <th> </th>
          <th> </th>
        </tr>
      </thead>
    );
  }
});
