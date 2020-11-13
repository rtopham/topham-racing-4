import React, { Fragment, useContext, useEffect } from 'react'
import StravaContext from '../../context/strava/stravaContext'
import Spinner from '../layout/Spinner'
import StravaStats from '../strava/StravaStats'
import PropTypes from 'prop-types'

const Strava = ({ match }) => {
  const stravaContext = useContext(StravaContext)

  const { stravaProfile, getStravaProfile } = stravaContext

  useEffect(() => {
    if (stravaProfile === null) getStravaProfile(match.params.userId)
    //eslint-disable-next-line
  }, [stravaProfile, match.params.userId])

  const StravaWidgets = () => {
    return (
      <div className='globalCore'>
        <iframe
          title='latestRides'
          height='454'
          width='930'
          frameBorder='0'
          allowtransparency='true'
          scrolling='no'
          src={stravaProfile.strava_rides_url}
        ></iframe>
        <iframe
          title='latestActivity'
          height='160'
          width='930'
          frameBorder='0'
          allowtransparency='true'
          scrolling='no'
          src={stravaProfile.strava_activity_url}
        ></iframe>
      </div>
    )
  }

  return (
    <div className='globalCore'>
      {/* <Banner userId={match.params.userId} /> */}
      {stravaProfile !== null ? (
        <Fragment>
          <StravaStats stravaProfile={stravaProfile} /> <StravaWidgets />
        </Fragment>
      ) : (
        <Spinner />
      )}
    </div>
  )
}

Strava.propTypes = {
  match: PropTypes.object.isRequired
}

export default Strava
