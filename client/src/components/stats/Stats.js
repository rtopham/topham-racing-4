import React, { Fragment, useContext, useEffect } from 'react'
import RaceContext from '../../context/race/raceContext'
import YearToDate from './YearToDate'
import AllTime from './AllTime'
import Spinner from '../../components/layout/Spinner'
import PropTypes from 'prop-types'

const Stats = ({ match }) => {
  const raceContext = useContext(RaceContext)

  const { races, getRaces, loading } = raceContext

  useEffect(() => {
    getRaces(match.params.userId)
    // eslint-disable-next-line
  }, [match.params.userId])

  return (
    <div className='globalCore'>
      {races !== null && !loading ? (
        <Fragment>
          <YearToDate races={races} /> <AllTime races={races} />
        </Fragment>
      ) : (
        <Spinner />
      )}
    </div>
  )
}

Stats.propTypes = {
  match: PropTypes.object.isRequired
}

export default Stats
