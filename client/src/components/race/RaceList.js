import React from 'react'
import { Table } from 'react-bootstrap'
import RaceRow from './RaceRow'
import PropTypes from 'prop-types'

const RaceList = ({ races, stravaProfile, showEdit, showDelete }) => {
  return (
    <div>
      {' '}
      <Table size='sm' striped bordered hover>
        <thead>
          <tr>
            <th>Series</th>
            <th>Name</th>
            <th className='centerthis'>Date</th>
            <th className='centerthis'>Category</th>
            <th className='centerthis'>Time</th>
            <th className='centerthis'>Rank</th>
          </tr>
        </thead>
        <tbody>
          {races.map((race, i) => {
            return (
              <RaceRow
                race={race}
                key={i}
                stravaProfile={stravaProfile}
                showEdit={showEdit || false}
                showDelete={showDelete || false}
              />
            )
          })}
        </tbody>
      </Table>
    </div>
  )
}

RaceList.propTypes = {
  races: PropTypes.array.isRequired,
  stravaProfile: PropTypes.object,
  showEdit: PropTypes.bool,
  showDelete: PropTypes.bool
}

export default RaceList
