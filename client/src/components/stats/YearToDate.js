import React, { Fragment } from 'react'
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap'
import RaceLogo from '../race/RaceLogo'

const YearToDate = ({ races }) => {
  const currentYear = new Date().getFullYear()

  const ytdRaces = races.filter(
    (race) => new Date(race.race_date).getFullYear() === currentYear
  )

  const ytdICUP = ytdRaces.filter((race) =>
    race.series.match('Intermountain Cup')
  ).length

  const ytdMidWeek = ytdRaces.filter((race) => race.series.match('Mid-Week'))
    .length
  const ytdUSAC = ytdRaces.filter((race) => race.series.match('USAC')).length

  const ytdOther = ytdRaces.length - ytdICUP - ytdUSAC - ytdMidWeek

  const ytdPodiums = ytdRaces.filter((race) => race.rank <= 3).length
  const ytdWins = ytdRaces.filter((race) => race.rank === 1).length

  let totalTime = 0
  let ytdTimeString = ''

  ytdRaces.forEach((race) => {
    let hms = race.time
    let a = hms.split(':')
    let seconds = +a[0] * 60 * 60 + +a[1] * 60 + +a[2]
    totalTime = totalTime + seconds
  })

  let hoursprefix = ''
  let minutesprefix = ''
  let secondsprefix = ''
  let hours = Math.floor(totalTime / 3600)
  let minutes = Math.floor((totalTime - hours * 3600) / 60)
  let seconds = totalTime - hours * 3600 - minutes * 60
  if (hours < 10) hoursprefix = '0'
  if (minutes < 10) minutesprefix = '0'
  if (seconds < 10) secondsprefix = '0'
  ytdTimeString =
    hoursprefix +
    hours +
    ':' +
    minutesprefix +
    minutes +
    ':' +
    secondsprefix +
    seconds

  return (
    <Fragment>
      {' '}
      <Card className='statsCard'>
        <Card.Header as='h6'>Stats</Card.Header>
        <Card.Body>
          <RaceLogo series='default' styleString='statsLogo' />

          <span className='listGroupTitle'>Year-To-Date</span>

          <ListGroup>
            <ListGroupItem>
              <RaceLogo
                series='Intermountain Cup'
                styleString='statsLogoImage'
              />
              &nbsp;ICUP Races: {ytdICUP}
            </ListGroupItem>
            <ListGroupItem>
              <RaceLogo series='Mid-Week' styleString='statsLogoImage' />
              &nbsp;Mid-Week Races: {ytdMidWeek}
            </ListGroupItem>
            <ListGroupItem>
              <RaceLogo series='USAC' styleString='statsLogoImage' />
              &nbsp;USAC Races: {ytdUSAC}
            </ListGroupItem>
            <ListGroupItem>
              <RaceLogo series='default' styleString='statsLogoImage' />
              &nbsp;Other Races: {ytdOther}
            </ListGroupItem>
            <ListGroupItem>Races: {ytdRaces.length}</ListGroupItem>
            <ListGroupItem>Podiums: {ytdPodiums}</ListGroupItem>
            <ListGroupItem>Wins: {ytdWins}</ListGroupItem>
            <ListGroupItem>Time: {ytdTimeString}</ListGroupItem>
          </ListGroup>
        </Card.Body>
      </Card>
    </Fragment>
  )
}

export default YearToDate
