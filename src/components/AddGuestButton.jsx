import React from 'react'
import styles from './AddGuestButton.css'

export default class AddGuestButton extends React.Component {

  _handleClick () {

    $('#AddGuestModal').modal() // eslint-disable-line no-undef
    document.getElementById('addGuestName').focus()

  }

  render () {

    return (
      <button
        id='btnAddGuest'
        type='button'
        className={`${styles.btnAddGuest} btn btn-default btn-lg`}
        onClick={this._handleClick}
      >
        <span
          className='glyphicon glyphicon-plus'
          aria-hidden='true'
        >
        </span> Add Guest
      </button>
    )

  }

}
