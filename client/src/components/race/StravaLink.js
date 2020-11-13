import React from 'react'
import axios from 'axios'
import { OverlayTrigger, Image, Tooltip } from 'react-bootstrap'
import stravaLogo from '../../images/stravaiconSM.gif'
import PropTypes from 'prop-types'

const StravaLink = ({ race, stravaProfile }) => {
  const tooltip = (
    <Tooltip id='tooltip'>
      <strong>View Strava Data for this Race (must allow popups)</strong>
    </Tooltip>
  )

  const clickStrava = async (e) => {
    e.preventDefault()
    const raceDate = e.target.dataset.raceDate
    const theDate = new Date(raceDate)
    const theEpoch = theDate.getTime() / 1000.0

    const config = {
      headers: {
        Authorization: `Bearer ${stravaProfile.strava_token}`
      }
    }

    const res = await axios.get(
      `https://www.strava.com/api/v3/athlete/activities?after=${theEpoch}&per_page=5`,
      config
    )
    const stravaRaces = res.data
    let raceId = 0
    let sufferScore = 0
    let loopCount = stravaRaces.length
    if (stravaRaces.length > 3) loopCount = 3

    for (var i = 0; i < loopCount; i++) {
      if (stravaRaces[i].suffer_score > sufferScore) {
        sufferScore = stravaRaces[i].suffer_score
        raceId = stravaRaces[i].id
      }
    }
    window.open(`https://www.strava.com/activities/${raceId}`)
  }

  const wrapper = React.createRef()

  return (
    <React.Fragment>
      {new Date(race.race_date) > new Date('2010-06-09') ? (
        <a href={'#' + race.race_date} onClick={clickStrava}>
          <OverlayTrigger placement='left' overlay={tooltip}>
            <Image
              alt='Strava Link'
              className='logoimage'
              src={stravaLogo}
              data-race-name={race.race_name}
              data-race-date={race.race_date}
              ref={wrapper}
            />
          </OverlayTrigger>
        </a>
      ) : null}
    </React.Fragment>
  )
}

StravaLink.propTypes = {
  race: PropTypes.object.isRequired,
  stravaProfile: PropTypes.object.isRequired
}

export default StravaLink
