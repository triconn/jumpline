// Libraries
import React from 'react';
// React components
// import AddGuestButton from './AddGuestButton.jsx';
// import AddGuestModal from './AddGuestModal.jsx';
import GuestTable from '../components/GuestTable.jsx';
import Nav from '../components/Nav.jsx';

export default class App extends React.Component {

  render() {
    return (

      <div>
        <Nav />
        {
        /*
          <AddGuestButton />
          <GuestTable />
          <AddGuestModal />
          */
        }
      </div>

    );
  }
}

