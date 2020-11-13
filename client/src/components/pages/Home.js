import React from 'react'
import Races from '../..//components/race/Races'
import PropTypes from 'prop-types'

const Home = ({ match }) => {
  return (
    <div className='globalCore'>
      <Races userId={match.params.userId} />
    </div>
  )
}

Home.propTypes = {
  match: PropTypes.object.isRequired
}

export default Home
