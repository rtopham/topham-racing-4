import React, { useState, useEffect } from 'react'
import { Form, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import { validateInputLength } from '../../lib/form-validation'
import EditSubmitCancel from './EditSubmitCancel'

const EditStrava = ({ user, stravaProfile, updateStravaProfile }) => {
  const initialState = {
    strava_athlete_id: '',
    strava_token: '',
    strava_refresh_token: '',
    strava_activity_url: '',
    strava_rides_url: ''
  }

  const [formData, setFormData] = useState(initialState)
  const [edit, toggleEditState] = useState(false)
  const [showAlert, setShowAlert] = useState(false)

  const {
    strava_athlete_id,
    strava_token,
    strava_refresh_token,
    strava_activity_url,
    strava_rides_url
  } = formData

  useEffect(() => {
    setFormData({
      _id: stravaProfile._id,
      user: stravaProfile.user,
      strava_athlete_id: stravaProfile.strava_athlete_id,
      strava_token: stravaProfile.strava_token,
      strava_refresh_token: stravaProfile.strava_refresh_token,
      strava_activity_url: stravaProfile.strava_activity_url,
      strava_rides_url: stravaProfile.strava_rides_url
    })
    // eslint-disable-next-line
  }, [user.id, stravaProfile])

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    updateStravaProfile(formData)
    setShowAlert(true)
    setTimeout(() => {
      setShowAlert(false)
    }, 3000)
    toggleEditState(false)
  }

  const toggleEdit = (e) => {
    toggleEditState(!edit)
  }

  const validateStravaId = (id) => {
    const regex = /^[0-9]{1,20}$/
    if (regex.test(id)) return 'success'
    else if (id.length > 0) return 'error'
  }

  return (
    <div>
      <Form onSubmit={onSubmit}>
        <FormGroup controlId='strava_athlete_id'>
          <FormLabel>Strava Athlete Id</FormLabel>
          <FormControl
            isValid={validateStravaId(strava_athlete_id) === 'success'}
            isInvalid={validateStravaId(strava_athlete_id) === 'error'}
            name='strava_athlete_id'
            type='number'
            value={strava_athlete_id}
            disabled={!edit}
            onChange={onChange}
          />
        </FormGroup>
        <FormGroup controlId='strava_token'>
          <FormLabel>Strava Token</FormLabel>
          <FormControl
            isValid={validateInputLength(strava_token, 20) === 'success'}
            isInvalid={validateInputLength(strava_token, 20) === 'error'}
            value={strava_token}
            onChange={onChange}
            disabled={!edit}
            name='strava_token'
          />
        </FormGroup>
        <FormGroup controlId='strava_refresh_token'>
          <FormLabel>Strava Refresh Token</FormLabel>
          <FormControl
            isValid={
              validateInputLength(strava_refresh_token, 20) === 'success'
            }
            isInvalid={
              validateInputLength(strava_refresh_token, 20) === 'error'
            }
            value={strava_refresh_token}
            disabled={!edit}
            onChange={onChange}
            name='strava_refresh_token'
          />
        </FormGroup>
        <FormGroup controlId='strava_activity_url'>
          <FormLabel>Strava Activity Url</FormLabel>
          <FormControl
            isValid={true}
            value={strava_activity_url}
            disabled={!edit}
            onChange={onChange}
            name='strava_activity_url'
          />
        </FormGroup>
        <FormGroup controlId='strava_rides_url'>
          <FormLabel>Strava Rides Url</FormLabel>
          <FormControl
            isValid={true}
            value={strava_rides_url}
            disabled={!edit}
            onChange={onChange}
            name='strava_rides_url'
          />
        </FormGroup>
        <FormGroup>
          <EditSubmitCancel
            edit={edit}
            validated={true}
            showAlert={showAlert}
            toggleEdit={toggleEdit}
            alertText='Saving Strava profile...'
          />
        </FormGroup>
      </Form>
    </div>
  )
}

export default EditStrava
