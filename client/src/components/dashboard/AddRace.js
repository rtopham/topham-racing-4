import React, { Fragment, useState } from 'react'
import RaceForm from './RaceForm'

const AddRace = ({ addRace }) => {
  const initialState = {
    race_name: '',
    series: '',
    race_date: '',
    location: '',
    category: '',
    time: '',
    rank: ''
  }

  const [formData, setFormData] = useState(initialState)
  const [edit, toggleEditState] = useState(true)
  const [showAlert, setShowAlert] = useState(false)

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    addRace(formData)
    setShowAlert(true)
    setTimeout(() => {
      setShowAlert(false)
    }, 3000)
    toggleEditState(true)
    setFormData(initialState)
  }

  const toggleEdit = (e) => {
    toggleEditState(true)
    setFormData(initialState)
  }

  return (
    <Fragment>
      <RaceForm
        onSubmit={onSubmit}
        onChange={onChange}
        toggleEdit={toggleEdit}
        formData={formData}
        showAlert={showAlert}
        alertText='Saving new race...'
        edit={edit}
      />
    </Fragment>
  )
}

export default AddRace
