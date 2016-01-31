import React from 'react';

//import GuestTableEntries from '../../web/react/components/GuestTableEntries.jsx';
import './GuestTable.css';

const GuestTable = (props) => {

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
          <tbody>
            {/*
            <GuestTableEntries />
            */}
          </tbody>
        </table>
      </div>
    </div>

  );
}

export default GuestTable;
