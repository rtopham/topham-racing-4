import React, { Fragment, useContext, useEffect } from 'react'
import StravaContext from '../../context/strava/stravaContext'
import StravaStatsCard from './StravaStatsCard'
import Spinner from '../layout/Spinner'
import PropTypes from 'prop-types'

const StravaStats = ({ stravaProfile }) => {
  const stravaContext = useContext(StravaContext)

  const { stravaData: data, getStravaData, stravaDataLoading } = stravaContext

  useEffect(() => {
    getStravaData(stravaProfile)
    //eslint-disable-next-line
  }, [stravaProfile])

  let stravaStats = { recentStats: {}, ytdStats: {}, allTimeStats: {} }

  if (data !== null && !stravaDataLoading) {
    const getTimeString = (seconds) => {
      let hours = seconds / 3600
      return hours.toLocaleString('en', { maximumFractionDigits: 1 })
    }

    const getMilesString = (meters) => {
      let miles = meters / 1609.34
      return miles.toLocaleString('en', { maximumFractionDigits: 1 })
    }

    const getElevationString = (meters) => {
      let feet = meters * 3.28084
      return feet.toLocaleString('en', { maximumFractionDigits: 0 })
    }

    stravaStats.recentStats.totalRides = data.recent_ride_totals.count.toLocaleString(
      'en',
      { maximumFractionDigits: 0 }
    )
    stravaStats.recentStats.totalDistance = getMilesString(
      data.recent_ride_totals.distance
    )
    stravaStats.recentStats.totalTime = getTimeString(
      data.recent_ride_totals.elapsed_time
    )
    stravaStats.recentStats.totalMovingTime = getTimeString(
      data.recent_ride_totals.moving_time
    )
    stravaStats.recentStats.totalElevation = getElevationString(
      data.recent_ride_totals.elevation_gain
    )
    stravaStats.ytdStats.totalRides = data.ytd_ride_totals.count.toLocaleString(
      'en',
      { maximumFractionDigits: 0 }
    )
    stravaStats.ytdStats.totalDistance = getMilesString(
      data.ytd_ride_totals.distance
    )
    stravaStats.ytdStats.totalTime = getTimeString(
      data.ytd_ride_totals.elapsed_time
    )
    stravaStats.ytdStats.totalMovingTime = getTimeString(
      data.ytd_ride_totals.moving_time
    )
    stravaStats.ytdStats.totalElevation = getElevationString(
      data.ytd_ride_totals.elevation_gain
    )
    stravaStats.allTimeStats.totalRides = data.all_ride_totals.count.toLocaleString(
      'en',
      { maximumFractionDigits: 0 }
    )
    stravaStats.allTimeStats.totalDistance = getMilesString(
      data.all_ride_totals.distance
    )
    stravaStats.allTimeStats.totalTime = getTimeString(
      data.all_ride_totals.elapsed_time
    )
    stravaStats.allTimeStats.totalMovingTime = getTimeString(
      data.all_ride_totals.moving_time
    )
    stravaStats.allTimeStats.totalElevation = getElevationString(
      data.all_ride_totals.elevation_gain
    )
  }
  return (
    <Fragment>
      {data !== null && !stravaDataLoading ? (
        <Fragment>
          <StravaStatsCard
            title='Recent Stats (last 28 days)'
            stats={stravaStats.recentStats}
          />
          <StravaStatsCard
            title='Year-To-Date Stats'
            stats={stravaStats.ytdStats}
          />
          <StravaStatsCard
            title='All-Time Stats (since 2012)'
            stats={stravaStats.allTimeStats}
          />{' '}
        </Fragment>
      ) : (
        <Spinner />
      )}
    </Fragment>
  )
}

StravaStats.propTypes = {
  stravaProfile: PropTypes.object.isRequired
}

export default StravaStats
