import React from 'react'
import Nav from '../components/Nav.jsx'

const App = (props) => {

  return (
    <div>
      <Nav />
      {props.children}
    </div>
  )

}

App.propTypes = {
  children: React.PropTypes.node,
}

export default App
