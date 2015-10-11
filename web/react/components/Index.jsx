// Libraries
import React from 'react';

// React components
import AddGuestButton from './AddGuestButton.jsx';
import AddGuestModal from './AddGuestModal.jsx';
import GuestTable from './GuestTable.jsx';
import Nav from './Nav.jsx';

export default class Index extends React.Component {

  render() {
    return (

      <div>
        <Nav />
        <AddGuestButton />
        <GuestTable />
        <AddGuestModal />
      </div>

    );
  }
}

