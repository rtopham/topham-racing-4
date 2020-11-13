import React, { Fragment } from 'react'
import { Form, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import {
  validateInputLength,
  validateDate,
  validateTime,
  validateRank
} from '../../lib/form-validation'
import EditSubmitCancel from './EditSubmitCancel'

const RaceForm = ({
  onSubmit,
  onChange,
  formData,
  edit,
  showAlert,
  toggleEdit,
  alertText
}) => {
  const {
    race_name,
    series,
    race_date,
    location,
    category,
    time,
    rank
  } = formData

  return (
    <Fragment>
      <Form onSubmit={onSubmit}>
        <FormGroup controlId='series'>
          <FormLabel>Series</FormLabel>
          <FormControl
            isValid={validateInputLength(series, 2) === 'success'}
            isInvalid={validateInputLength(series, 2) === 'error'}
            name='series'
            value={series}
            disabled={!edit}
            onChange={onChange}
          />
        </FormGroup>
        <FormGroup controlId='race_name'>
          <FormLabel>Race Name</FormLabel>
          <FormControl
            isValid={validateInputLength(race_name, 4) === 'success'}
            isInvalid={validateInputLength(race_name, 4) === 'error'}
            name='race_name'
            value={race_name}
            disabled={!edit}
            onChange={onChange}
          />
        </FormGroup>
        <FormGroup controlId='race_date'>
          <FormLabel>Date</FormLabel>
          <FormControl
            isValid={validateDate(race_date) === 'success'}
            isInvalid={validateDate(race_date) === 'error'}
            name='race_date'
            value={race_date}
            disabled={!edit}
            onChange={onChange}
          />
        </FormGroup>
        <FormGroup controlId='location'>
          <FormLabel>Location</FormLabel>
          <FormControl
            isValid={validateInputLength(location, 2) === 'success'}
            isInvalid={validateInputLength(location, 2) === 'error'}
            name='location'
            value={location}
            disabled={!edit}
            onChange={onChange}
          />
        </FormGroup>
        <FormGroup controlId='category'>
          <FormLabel>Category</FormLabel>
          <FormControl
            isValid={validateInputLength(category, 4) === 'success'}
            isInvalid={validateInputLength(category, 4) === 'error'}
            name='category'
            value={category}
            disabled={!edit}
            onChange={onChange}
          />
        </FormGroup>
        <FormGroup controlId='time'>
          <FormLabel>Time</FormLabel>
          <FormControl
            isValid={validateTime(time) === 'success'}
            isInvalid={validateTime(time) === 'error'}
            name='time'
            value={time}
            disabled={!edit}
            onChange={onChange}
          />
        </FormGroup>
        <FormGroup controlId='rank'>
          <FormLabel>Rank</FormLabel>
          <FormControl
            isValid={validateRank(rank) === 'success'}
            isInvalid={validateRank(rank) === 'error'}
            name='rank'
            value={rank}
            disabled={!edit}
            onChange={onChange}
          />
        </FormGroup>
        <FormGroup>
          <EditSubmitCancel
            edit={edit}
            validated={
              validateInputLength(series, 2) === 'success' &&
              validateInputLength(race_name, 4) === 'success' &&
              validateDate(race_date) === 'success' &&
              validateInputLength(category, 4) === 'success' &&
              validateTime(time) === 'success' &&
              validateRank(rank) === 'success'
            }
            showAlert={showAlert}
            toggleEdit={toggleEdit}
            alertText={alertText}
          />
        </FormGroup>
      </Form>
    </Fragment>
  )
}

export default RaceForm
