import React, { Fragment, useContext, useEffect } from 'react'
import {
  Card,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Tabs,
  Tab
} from 'react-bootstrap'
import EditProfile from './EditProfile'
import EditStrava from './EditStrava'
import EditPassword from './EditPassword'
import AddRace from './AddRace'
import EditRace from './EditRace'
import ManageBanners from './ManageBanners'
import AuthContext from '../../context/auth/authContext'
import StravaContext from '../../context/strava/stravaContext'
import RaceContext from '../../context/race/raceContext'

const Dashboard = () => {
  const authContext = useContext(AuthContext)
  const {
    user,
    getBanners,
    isAuthenticated,
    loadUser,
    updateUser
  } = authContext

  const stravaContext = useContext(StravaContext)
  const { stravaProfile, getStravaProfile, updateStravaProfile } = stravaContext

  const raceContext = useContext(RaceContext)
  const { races, getRaces, addRace } = raceContext

  useEffect(() => {
    if (isAuthenticated && user === null) {
      loadUser()
    }
    if (user !== null) {
      getStravaProfile(user._id)
      getRaces(user._id)
      getBanners(user._id)
    }

    //eslint-disable-next-line
  }, [isAuthenticated, user])

  const { avatar, name, email, date, _id } = user || {}

  return (
    <div className='globalCore'>
      {user !== null && races !== null && stravaProfile !== null && (
        <Fragment>
          <Card>
            <Card.Body>
              <Row>
                <Col>
                  <img src={avatar} alt='' />
                </Col>
                <Col>
                  <ListGroup>
                    <ListGroupItem>{name}</ListGroupItem>
                    <ListGroupItem>{email}</ListGroupItem>
                    <ListGroupItem>
                      Joined: {date.substring(0, 10)}
                    </ListGroupItem>
                    <ListGroupItem>User Id: {_id}</ListGroupItem>
                  </ListGroup>
                </Col>
              </Row>
              <Row></Row>
            </Card.Body>
          </Card>
          <div className='tabsDiv'>
            <Tabs defaultActiveKey='profile' id='tabs'>
              <Tab eventKey='profile' title='Edit Profile'>
                <div className='tabContent'>
                  <EditProfile user={user} updateUser={updateUser} />
                </div>
              </Tab>
              <Tab eventKey='strava' title='Edit Strava'>
                <div className='tabContent'>
                  <EditStrava
                    user={user}
                    stravaProfile={stravaProfile}
                    updateStravaProfile={updateStravaProfile}
                  />
                </div>
              </Tab>
              <Tab eventKey='password' title='Change Password'>
                <div className='tabContent'>
                  <EditPassword user={user} updateUser={updateUser} />
                </div>
              </Tab>

              <Tab eventKey='addRace' title='Add Race'>
                <div className='tabContent'>
                  <AddRace user={user} addRace={addRace} />
                </div>
              </Tab>
              <Tab eventKey='editRace' title='Edit Race'>
                <div className='tabContent'>
                  <EditRace />
                </div>
              </Tab>
              <Tab eventKey='banners' title='Manage Banners'>
                <div className='tabContent'>
                  <ManageBanners user={user} />
                </div>
              </Tab>
            </Tabs>
          </div>
        </Fragment>
      )}
    </div>
  )
}

export default Dashboard
