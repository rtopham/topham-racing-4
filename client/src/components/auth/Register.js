import React, { useState, useContext, useEffect } from 'react'
import { Card, Form, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import {
  validateInputLength,
  validateEmail,
  validatePassword,
  validateConfirmPassword
} from '../../lib/form-validation'
import AlertContext from '../../context/alert/alertContext'
import AuthContext from '../../context/auth/authContext'

const Register = (props) => {
  const alertContext = useContext(AlertContext)
  const authContext = useContext(AuthContext)

  const { setAlert } = alertContext
  const { register, error, clearErrors, isAuthenticated } = authContext

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/')
    }
    if (error === 'User already exists') {
      setAlert(error, 'danger')
      clearErrors()
    }
    //eslint-disable-next-line
  }, [error, isAuthenticated, props.history])

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  const { name, email, password, password2 } = user

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (name === '' || email === '' || password === '') {
      setAlert('Please enter all fields', 'danger')
    } else if (password !== password2) {
      setAlert('Passwords do not match', 'danger')
    } else {
      register({
        name,
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
            <span className='text-primary'>Register</span>
          </h1>
        </Card.Header>
        <Form onSubmit={onSubmit}>
          <FormGroup>
            <FormLabel>Name</FormLabel>
            <FormControl
              type='text'
              name='name'
              isValid={validateInputLength(name, 2) === 'success'}
              isInvalid={validateInputLength(name, 2) === 'error'}
              value={name}
              onChange={onChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Email Address</FormLabel>
            <FormControl
              type='email'
              name='email'
              value={email}
              isValid={validateEmail(email) === 'success'}
              isInvalid={validateEmail(email) === 'error'}
              onChange={onChange}
              required
              minLength='6'
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Password</FormLabel>
            <FormControl
              type='password'
              name='password'
              value={password}
              isValid={validatePassword(password) === 'success'}
              isInvalid={validatePassword(password) === 'error'}
              onChange={onChange}
              required
              minLength='6'
            />
          </FormGroup>
          <FormGroup className='form-group'>
            <FormLabel htmlFor='password2'>Confirm Password</FormLabel>
            <FormControl
              type='password'
              name='password2'
              value={password2}
              isValid={
                validateConfirmPassword(password, password2) === 'success'
              }
              isInvalid={
                validateConfirmPassword(password, password2) === 'error'
              }
              onChange={onChange}
              required
            />
          </FormGroup>
          <input
            type='submit'
            value='Register'
            className='btn btn-primary btn-block'
          />
        </Form>
      </Card>
    </div>
  )
}

export default Register
