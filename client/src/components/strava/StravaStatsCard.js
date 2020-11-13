import React from 'react'
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap'
import stravaLogo from '../../images/stravaiconSM.gif'
import PropTypes from 'prop-types'

const StravaStatsCard = ({ title, stats }) => {
  return (
    <Card className='stravaCard'>
      <Card.Header as='h6'>Strava</Card.Header>
      <Card.Body>
        <img alt='' className='stravaLogo' src={stravaLogo} />
        <span className='stravaTitle'>{title}</span>
        <ListGroup>
          <ListGroupItem>Rides: {stats.totalRides} </ListGroupItem>
          <ListGroupItem>
            Distance: {stats.totalDistance + ' miles'}{' '}
          </ListGroupItem>
          <ListGroupItem>Time: {stats.totalTime + ' hours'} </ListGroupItem>
          <ListGroupItem>
            Moving Time: {stats.totalMovingTime + ' hours'}{' '}
          </ListGroupItem>
          <ListGroupItem>
            Elevation: {stats.totalElevation + ' feet'}{' '}
          </ListGroupItem>
        </ListGroup>
      </Card.Body>
    </Card>
  )
}

StravaStatsCard.propTypes = {
  title: PropTypes.string,
  stats: PropTypes.object.isRequired
}

export default StravaStatsCard
