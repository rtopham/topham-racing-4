import React, { useState } from 'react'
import { Form, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import {
  validatePassword,
  validateConfirmPassword
} from '../../lib/form-validation'
import EditSubmitCancel from './EditSubmitCancel'

const EditPassword = ({ user, updateUser }) => {
  const initialState = {
    password: '',
    password2: ''
  }

  const [formData, setFormData] = useState(initialState)
  const [edit, toggleEditState] = useState(false)
  const [showAlert, setShowAlert] = useState(false)

  const { password, password2 } = formData

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    updateUser({
      name: user.name,
      email: user.email,
      password: formData.password
    })

    setShowAlert(true)
    setTimeout(() => {
      setShowAlert(false)
    }, 3000)
    toggleEditState(false)
    setFormData({ password: '', password2: '' })
  }

  const toggleEdit = (e) => {
    toggleEditState(!edit)
  }

  return (
    <Form onSubmit={onSubmit}>
      <FormGroup controlId='password'>
        <FormLabel>New Password</FormLabel>
        <FormControl
          autoFocus
          isValid={validatePassword(password) === 'success'}
          isInvalid={validatePassword(password) === 'error'}
          name='password'
          type='password'
          value={password}
          disabled={!edit}
          onChange={onChange}
        />
      </FormGroup>
      <FormGroup controlId='password2'>
        <FormLabel>Confirm New Password</FormLabel>
        <FormControl
          isValid={validateConfirmPassword(password, password2) === 'success'}
          isInvalid={validateConfirmPassword(password, password2) === 'error'}
          name='password2'
          type='password'
          value={password2}
          disabled={!edit}
          onChange={onChange}
        />
      </FormGroup>
      <FormGroup>
        <EditSubmitCancel
          edit={edit}
          validated={
            validatePassword(password) === 'success' &&
            validateConfirmPassword(password, password2) === 'success'
          }
          showAlert={showAlert}
          toggleEdit={toggleEdit}
          alertText='Saving new password...'
        />
      </FormGroup>
    </Form>
  )
}

export default EditPassword
