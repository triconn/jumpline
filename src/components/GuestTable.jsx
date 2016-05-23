import React from 'react'
import GuestTableEntry from './GuestTableEntry.jsx'
import styles from './GuestTable.css'

const GuestTable = (props) => {

  const rows = props.queue.map((guest, index) => {

    return (
      <GuestTableEntry
        key={index}
        guest={guest}
        pollInterval={props.pollInterval}
      />
    )

  })

  return (
    <div className='bs-example' data-example-id='table-within-panel'>
      <div className='panel panel-default'>
        <table className={`table table-striped ${styles.table}`}>
          <thead>
            <tr>
              <th>Guest</th>
              <th>
                Waited
                <span className='greyText'>/ Quoted</span>
              </th>
              <th> </th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    </div>
  )

}

GuestTable.propTypes = {
  pollInterval: React.PropTypes.number,
  queue: React.PropTypes.object,
}

export default GuestTable
