import React, { Fragment } from 'react'
import RaceLogo from './RaceLogo'
import StravaLink from './StravaLink'
import EditLink from './EditLink'
import DeleteLink from './DeleteLink'
import PropTypes from 'prop-types'

const RaceRow = ({ race, stravaProfile, showEdit, showDelete }) => {
  return (
    <Fragment>
      <tr>
        <td>
          <RaceLogo series={race.series} styleString='logoimage' />
          {race.series}
        </td>
        <td>
          {race.race_name}

          {!showEdit && !showDelete ? (
            <StravaLink race={race} stravaProfile={stravaProfile} />
          ) : !showDelete ? (
            <EditLink race={race} />
          ) : (
            showDelete && <DeleteLink race={race} />
          )}
        </td>
        <td className='centerthis'>{race.race_date.substring(0, 10)}</td>
        <td className='centerthis'>{race.category}</td>

        <td className='centerthis'>{race.time}</td>
        <td className='centerthis'>{race.rank === 0 ? 'DNF' : race.rank}</td>
      </tr>
    </Fragment>
  )
}

RaceRow.propTypes = {
  race: PropTypes.object.isRequired,
  stravaProfile: PropTypes.object,
  showEdit: PropTypes.bool.isRequired,
  showDelete: PropTypes.bool.isRequired
}

export default RaceRow
