import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addGuest, getGuests } from '../reducers/queueActions.js';

//import AddGuestButton from '../components/AddGuestButton.jsx';
// import AddGuestModal from './AddGuestModal.jsx';
import GuestTable from '../components/GuestTable.jsx';
import Nav from '../components/Nav.jsx';

class App extends React.Component {

  componentDidMount() {
    this.props.getGuests();
  }

  render() {
    return (

      <div>
        <Nav />
        {/*
          <AddGuestButton />
          */}
          <GuestTable
            queue={this.props.queue}
          />
          {/*
            <AddGuestModal />
            */}
      </div>

    );
  }
}

// Redux boilerplate
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addGuest,
    getGuests,
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    queue: state.queue
  }
}

// Inject state and dispatch function into App props
export default connect(mapStateToProps, mapDispatchToProps)(App);
