import React from 'react';
import GuestTableEntries from '../../web/react/components/GuestTableEntries.jsx';
import './GuestTable.css';

export default class GuestTable extends React.Component {

  render() {
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
}
