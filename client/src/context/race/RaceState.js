import React, { useReducer } from 'react'
import axios from 'axios'
import RaceContext from './raceContext'
import raceReducer from './raceReducer'
import {
  GET_RACES,
  CLEAR_RACES,
  ADD_RACE,
  DELETE_RACE,
  UPDATE_RACE,
  FILTER_RACES,
  CLEAR_FILTER,
  RACE_ERROR,
  SET_SELECTED,
  CLEAR_SELECTED,
  SET_DELETE_ALERT,
  REMOVE_DELETE_ALERT
} from '../types'

const RaceState = (props) => {
  const initialState = {
    races: null,
    current: null,
    selectedRace: null,
    filtered: null,
    error: null,
    loading: true,
    showDeleteAlert: false
  }

  const [state, dispatch] = useReducer(raceReducer, initialState)

  // Get Races

  const getRaces = async (userId) => {
    try {
      const res = await axios.get(`/api/races/${userId}`)
      dispatch({ type: GET_RACES, payload: res.data })
    } catch (err) {
      dispatch({
        type: RACE_ERROR,
        payload: err.response.msg
      })
    }
  }

  //Add Race

  const addRace = async (race) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const res = await axios.post('/api/races', race, config)
      dispatch({ type: ADD_RACE, payload: res.data })
    } catch (err) {
      dispatch({
        type: RACE_ERROR,
        payload: err.response.msg
      })
    }
  }

  //Delete Race

  const deleteRace = async (id) => {
    try {
      await axios.delete(`/api/races/${id}`)
      dispatch({ type: DELETE_RACE, payload: id })
    } catch (err) {
      dispatch({
        type: RACE_ERROR,
        payload: err.response.msg
      })
    }
  }

  //Update Race
  const updateRace = async (race) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const res = await axios.put(`/api/races/${race._id}`, race, config)
      dispatch({ type: UPDATE_RACE, payload: res.data })
    } catch (err) {
      dispatch({
        type: RACE_ERROR,
        payload: err.response.msg
      })
    }
  }

  const clearRaces = () => {
    dispatch({ type: CLEAR_RACES })
  }

  //Set Selected Race

  const setSelected = (race) => {
    dispatch({ type: SET_SELECTED, payload: race })
  }

  const clearSelected = () => {
    dispatch({ type: CLEAR_SELECTED })
  }

  const setDeleteAlert = () => {
    dispatch({ type: SET_DELETE_ALERT })
    setTimeout(() => dispatch({ type: REMOVE_DELETE_ALERT }), 3000)
  }

  //Filter Races

  /*   const filterRaces = (text) => {
    dispatch({ type: FILTER_RACES, payload: text })
  } */

  const filterRaces = (filter) => {
    dispatch({ type: FILTER_RACES, payload: filter })
  }

  //Clear Filter

  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER })
  }

  return (
    <RaceContext.Provider
      value={{
        races: state.races,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        loading: state.loading,
        selectedRace: state.selectedRace,
        showDeleteAlert: state.showDeleteAlert,
        addRace,
        deleteRace,
        updateRace,
        filterRaces,
        clearFilter,
        getRaces,
        clearRaces,
        setSelected,
        clearSelected,
        setDeleteAlert
      }}
    >
      {props.children}
    </RaceContext.Provider>
  )
}

export default RaceState
