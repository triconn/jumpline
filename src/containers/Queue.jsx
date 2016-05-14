import Debug from 'debug'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addGuest, getGuests } from '../reducers/queueActions.js'
import { QueueFilters } from '../lib/constants.js'

import AddGuestButton from '../components/AddGuestButton.jsx'
import AddGuestModal from '../components/AddGuestModal.jsx'
import GuestTable from '../components/GuestTable.jsx'

const log = Debug('jl:Queue')

class Queue extends React.Component {

  componentDidMount () {

    this.props.getGuests(
      'guestId',
      'name',
      'phone',
      'estimate',
      'size',
      'status',
      'estimatedAt',
      'createdAt',
      'updatedAt'
    )

  }

  render () {

    return (

      <div>
        <AddGuestButton />
        <GuestTable
          pollInterval={5000}
          queue={this.props.queue}
        />
        <AddGuestModal
          addGuest={this.props.addGuest}
        />
      </div>

    )

  }
}

Queue.propTypes = {
  addGuest: React.PropTypes.func,
  getGuests: React.PropTypes.func,
  queue: React.PropTypes.object,
}

// Set queue filter
const getFilteredQueue = (queue, filter) => {

  switch (filter.get('queueFilter')) {

    case QueueFilters.ALL_GUESTS:
      return queue

    case QueueFilters.CURRENT_GUESTS:
      return queue.filter((guest) => {

        return guest.get('status') !== 'completed'

      })

    case QueueFilters.COMPLETED_GUESTS:
      return queue.filter((guest) => {

        return guest.get('status') === 'completed'

      })

    default:
      return queue

  }

}

// Set queue sort
const getSortedQueue = (queue) => {

  log('sorting queue by createdAt')
  return queue.sort((a, b) => {

    return new Date(b.get('createdAt')) - new Date(a.get('createdAt'))

  })

}

// Redux boilerplate
function mapStateToProps (state) {

  return {
    queue: getSortedQueue(getFilteredQueue(state.queue, state.queueFilter)),
  }

}

function mapDispatchToProps (dispatch) {

  return bindActionCreators({
    addGuest,
    getGuests,
  }, dispatch)

}

// Inject state and dispatch function into Queue props
export default connect(mapStateToProps, mapDispatchToProps)(Queue)
