import React, { useState, useContext, useEffect } from 'react'
import { Card, Form, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import AlertContext from '../../context/alert/alertContext'
import AuthContext from '../../context/auth/authContext'

const Login = (props) => {
  const alertContext = useContext(AlertContext)
  const authContext = useContext(AuthContext)

  const { setAlert } = alertContext
  const { login, error, clearErrors, isAuthenticated } = authContext

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/')
    }
    if (error === 'Invalid Credentials') {
      setAlert(error, 'danger')
      clearErrors()
    }
    //eslint-disable-next-line
  }, [error, isAuthenticated, props.history])

  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const { email, password } = user

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (email === '' || password === '') {
      setAlert('Please fill in all fields', 'danger')
    } else {
      login({
        email,
        password
      })
    }
  }

  return (
    <div className='Signin'>
      <Card>
        <Card.Header>
          <h1>
            <span className='text-primary'>Login</span>
          </h1>
        </Card.Header>

        <Form onSubmit={onSubmit}>
          <FormGroup controlId='email'>
            <FormLabel>Email</FormLabel>
            <FormControl
              type='email'
              name='email'
              value={email}
              onChange={onChange}
              required
            />
          </FormGroup>
          <FormGroup controlId='password'>
            <FormLabel>Password</FormLabel>
            <FormControl
              type='password'
              name='password'
              value={password}
              onChange={onChange}
              required
            />
          </FormGroup>
          <input
            type='submit'
            value='Login'
            className='btn btn-primary btn-block'
          />
        </Form>
      </Card>
    </div>
  )
}

export default Login
