import React, { Fragment, useState, useEffect, useContext } from 'react'
import { Alert } from 'react-bootstrap'
import RaceForm from './RaceForm'
import RaceList from '../race/RaceList'
import RaceContext from '../../context/race/raceContext'

const EditRace = () => {
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

  const raceContext = useContext(RaceContext)

  const {
    updateRace,
    races,
    selectedRace,
    clearSelected,
    showDeleteAlert
  } = raceContext

  useEffect(() => {
    if (selectedRace) {
      setFormData({
        ...selectedRace,
        race_date: selectedRace.race_date.substring(0, 10)
      })
    }
    //eslint-disable-next-line
  }, [selectedRace])

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    updateRace(formData)
    setShowAlert(true)
    setTimeout(() => {
      setShowAlert(false)
      clearSelected()
    }, 3000)
    toggleEditState(true)
    setFormData(initialState)
  }

  const toggleEdit = (e) => {
    toggleEditState(true)
    setFormData(initialState)
    clearSelected()
  }

  return (
    <Fragment>
      {!selectedRace ? (
        <RaceList races={races} showEdit={true} showDelete={false} />
      ) : (
        <Fragment>
          {!showDeleteAlert && (
            <Fragment>
              <RaceList
                races={races.filter((race) => race._id === selectedRace._id)}
                showDelete={true}
                showEdit={true}
              />
              <RaceForm
                onSubmit={onSubmit}
                onChange={onChange}
                toggleEdit={toggleEdit}
                formData={formData}
                showAlert={showAlert}
                alertText='Updating race...'
                edit={edit}
              />
            </Fragment>
          )}
          <Alert show={showDeleteAlert} variant='success'>
            Deleting race...
          </Alert>
        </Fragment>
      )}
    </Fragment>
  )
}

export default EditRace
