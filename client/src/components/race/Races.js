import React, { Fragment, useContext, useEffect } from 'react'
import RaceContext from '../../context/race/raceContext'
import StravaContext from '../../context/strava/stravaContext'
import LastRace from './LastRace'
import RaceList from './RaceList'
import Filters from './Filters'
import Spinner from '../layout/Spinner'
import PropTypes from 'prop-types'

const Races = ({ userId }) => {
  const raceContext = useContext(RaceContext)
  const stravaContext = useContext(StravaContext)

  const { races, getRaces, filtered, loading } = raceContext

  const {
    stravaProfile,
    loading: stravaProfileLoading,
    getStravaProfile
  } = stravaContext

  useEffect(() => {
    if (!races) getRaces(userId)
    if (!stravaProfile) getStravaProfile(userId)
    //eslint-disable-next-line
  }, [races, stravaProfile, userId])

  return (
    <Fragment>
      {races !== null &&
      !loading &&
      stravaProfile !== null &&
      !stravaProfileLoading ? (
        <Fragment>
          <LastRace lastRace={races[0]} />
          <Filters />
          <RaceList
            races={filtered ? filtered : races}
            stravaProfile={stravaProfile}
            showDelete={false}
          />
        </Fragment>
      ) : (
        <Spinner />
      )}
    </Fragment>
  )
}

Races.propTypes = {
  userId: PropTypes.string.isRequired
}

export default Races
