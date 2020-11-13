import React, { Fragment, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, Image, Container } from 'react-bootstrap'
import PropTypes from 'prop-types'
import AuthContext from '../../context/auth/authContext'
import brandImage from '../../images/chainringSM.gif'

const MainNavbar = ({ title }) => {
  const authContext = useContext(AuthContext)

  const { isAuthenticated, logout, user, loadUser } = authContext

  useEffect(() => {
    if (isAuthenticated && user === null) {
      loadUser()
    }

    //eslint-disable-next-line
  }, [isAuthenticated])

  const onLogout = () => {
    logout()
  }

  const authLinks = (
    <Fragment>
      <Navbar.Text>{user && 'Hello ' + user.name} </Navbar.Text>
      <Nav.Item>
        <Nav.Link as={Link} to='/dashboard'>
          Dashboard
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to='/login' onClick={onLogout}>
          <i className='fa fa-sign-out-alt'></i> Logout
        </Nav.Link>
      </Nav.Item>
      <Nav.Item></Nav.Item>
    </Fragment>
  )

  const guestLinks = (
    <Fragment>
      <Nav.Item>
        <Nav.Link as={Link} to='/stats'>
          Stats
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to='/strava'>
          Strava
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to='/login'>
          Login
        </Nav.Link>
      </Nav.Item>
    </Fragment>
  )

  return (
    <div>
      <Navbar expand='sm' variant='light' bg='light' fixed='top'>
        <Container className='menuContainer'>
          <Navbar.Brand as={Link} to='/'>
            <Image className='brandImage' src={brandImage} /> {title}
          </Navbar.Brand>
          <Nav>{isAuthenticated ? authLinks : guestLinks}</Nav>
        </Container>
      </Navbar>
    </div>
  )
}

MainNavbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
}

MainNavbar.defaultProps = {
  title: 'Topham Racing'
}

export default MainNavbar
