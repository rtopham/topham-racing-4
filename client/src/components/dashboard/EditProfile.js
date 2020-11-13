import React, { useState, useEffect } from 'react'
import { Form, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import { validateInputLength, validateEmail } from '../../lib/form-validation'
import EditSubmitCancel from './EditSubmitCancel'

const EditProfile = ({ user, updateUser }) => {
  const initialState = {
    name: '',
    email: ''
  }

  const [formData, setFormData] = useState(initialState)
  const [edit, toggleEditState] = useState(false)
  const [showAlert, setShowAlert] = useState(false)

  useEffect(() => {
    setFormData({
      name: user.name,
      email: user.email
    })
    //eslint-disable-next-line
  }, [])

  const { name, email } = formData

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    updateUser(formData)
    setShowAlert(true)
    setTimeout(() => {
      setShowAlert(false)
    }, 3000)
    toggleEditState(false)
  }

  const toggleEdit = (e) => {
    toggleEditState(!edit)
  }

  return (
    <Form onSubmit={onSubmit}>
      <FormGroup controlId='name'>
        <FormLabel>Name</FormLabel>
        <FormControl
          autoFocus
          isValid={validateInputLength(name, 2) === 'success'}
          isInvalid={validateInputLength(name, 2) === 'error'}
          name='name'
          type='name'
          value={name}
          disabled={!edit}
          onChange={onChange}
        />
      </FormGroup>
      <FormGroup controlId='email'>
        <FormLabel>Email</FormLabel>
        <FormControl
          isValid={validateEmail(email) === 'success'}
          isInvalid={validateEmail(email) === 'error'}
          name='email'
          type='email'
          value={email}
          disabled={!edit}
          onChange={onChange}
        />
      </FormGroup>
      <FormGroup>
        <EditSubmitCancel
          edit={edit}
          validated={
            validateInputLength(name, 2) === 'success' &&
            validateEmail(email) === 'success' &&
            (name !== user.name || email !== user.email)
          }
          showAlert={showAlert}
          toggleEdit={toggleEdit}
          alertText='Saving profile...'
        />
      </FormGroup>
    </Form>
  )
}

export default EditProfile
