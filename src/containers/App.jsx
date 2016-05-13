import Debug from 'debug';
import React from 'react';

import Nav from '../components/Nav.jsx';

const log = Debug('jl:App');

class App extends React.Component {

  render() {
    return (

      <div>
        <Nav />
        {this.props.children}
      </div>

    );
  }
}

export default App;
