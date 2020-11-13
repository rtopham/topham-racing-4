import React, { Fragment } from 'react'
import { Card, ListGroup } from 'react-bootstrap'
import RaceLogo from './RaceLogo'
import PropTypes from 'prop-types'

const LastRace = ({ lastRace }) => {
  const { race_name, race_date, series, time, rank, category } = lastRace

  return (
    <Fragment>
      <Card className='lastRaceCard'>
        <Card.Header as='h6'>
          {'Last Race: ' + race_date.substring(0, 10)}
        </Card.Header>
        <Card.Body>
          <RaceLogo series={series} styleString='lastRaceLogo' />
          <span className='raceName'>{race_name}</span>
          <ListGroup>
            <ListGroup.Item>Rank: {rank}</ListGroup.Item>
            <ListGroup.Item>Time: {time}</ListGroup.Item>
            <ListGroup.Item>Category: {category}</ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </Fragment>
  )
}

LastRace.propTypes = {
  lastRace: PropTypes.object.isRequired
}

export default LastRace
