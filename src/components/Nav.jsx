import React from 'react'
import styles from './Nav.css'
import LogoutButton from './LogoutButton.jsx'

const LogoPng = require('../../static/images/logo.png')

const Nav = function Nav (props) {

  return (
    <nav className={`navbar navbar-default ${styles.navbar}`}>
      <div className='container-fluid'>
        <div className='navbar-header'>
          <button
            type='button'
            className='navbar-toggle collapsed'
            data-toggle='collapse'
            data-target='#bs-example-navbar-collapse-1'
          >
            <span className='sr-only'>Toggle navigation</span>
            <span className='icon-bar'></span>
            <span className='icon-bar'></span>
            <span className='icon-bar'></span>
          </button>
          <a href='/'>
            <img alt='Jumpline' src={LogoPng} />
          </a>
        </div>

        <div
          className='collapse navbar-collapse'
          id='bs-example-navbar-collapse-1'
        >
          <button type='button' className='btn btn-default navbar-btn'>
            <span className='greyText'>Jumpline</span>
          </button>
          <button type='button' className='btn btn-default navbar-btn'>
            <span className='greyText'>Edit Text Message</span>
          </button>
          <LogoutButton />
        </div>
      </div>
    </nav>
  )

}

export default Nav
