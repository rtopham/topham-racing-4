import React, { useReducer } from 'react'
import axios from 'axios'
import StravaContext from './stravaContext'
import stravaReducer from './stravaReducer'
import {
  GET_STRAVA_PROFILE,
  UPDATE_STRAVA_PROFILE,
  UPDATE_STRAVA_TOKENS,
  GET_STRAVA_DATA,
  STRAVA_ERROR,
  SET_LOADING_TRUE,
  SET_LOADING_FALSE
} from '../types'

const StravaState = (props) => {
  const initialState = {
    stravaProfile: null,
    stravaData: null,
    current: null,
    filtered: null,
    error: null,
    loading: true,
    stravaDataLoading: true
  }

  const [state, dispatch] = useReducer(stravaReducer, initialState)

  let stravaClientId
  let stravaClientSecret
  let stravaUpdateSecret

  /* if (process.env.NODE_ENV !== 'production') { */
  stravaClientId = process.env.REACT_APP_STRAVA_CLIENT_ID
  stravaClientSecret = process.env.REACT_APP_STRAVA_CLIENT_SECRET
  stravaUpdateSecret = process.env.REACT_APP_STRAVA_UPDATE_SECRET
  /*   } else {
    stravaClientId = process.env.STRAVA_CLIENT_ID
    stravaClientSecret = process.env.STRAVA_CLIENT_SECRET
    stravaUpdateSecret = process.env.STRAVA_UPDATE_SECRET
  } */

  //Get Strava Profile

  const getStravaProfile = async (userId) => {
    dispatch({ type: SET_LOADING_TRUE })
    try {
      const res = await axios.get(`/api/strava/${userId}`)

      dispatch({ type: GET_STRAVA_PROFILE, payload: res.data })

      const { strava_token_expires_at, strava_refresh_token } = res.data

      //Check to see if strava access token has expired and if so refresh and update strava profile with new tokens.
      const now = new Date()
      const secondsSinceEpoch = Math.round(now.getTime() / 1000)
      if (strava_token_expires_at < secondsSinceEpoch) {
        const newTokens = await axios.post(
          `https://www.strava.com/api/v3/oauth/token?client_id=${stravaClientId}&client_secret=${stravaClientSecret}&grant_type=refresh_token&refresh_token=${strava_refresh_token}`
        )

        const tokenUpdateObject = {
          strava_token: newTokens.data.access_token,
          strava_token_expires_at: newTokens.data.expires_at,
          strava_refresh_token: newTokens.data.refresh_token
        }

        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        }

        await axios.put(
          `/api/strava/refresh/${userId}/${stravaUpdateSecret}`,
          tokenUpdateObject,
          config
        )

        dispatch({ type: UPDATE_STRAVA_TOKENS, payload: tokenUpdateObject })
      }

      dispatch({ SET_LOADING_FALSE })
    } catch (err) {
      dispatch({
        type: STRAVA_ERROR,
        payload: err
      })
    }
  }

  //Update Strava Profile

  const updateStravaProfile = async (newProfile) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const res = await axios.post(`/api/strava`, newProfile, config)
      dispatch({ type: UPDATE_STRAVA_PROFILE, payload: res.data })
    } catch (err) {
      dispatch({
        type: STRAVA_ERROR,
        payload: err.response.msg
      })
    }
  }

  // Get Strava Data

  const getStravaData = async (stravaProfile) => {
    const { strava_athlete_id, strava_token } = stravaProfile
    try {
      const res = await axios.get(
        `https://www.strava.com/api/v3/athletes/${strava_athlete_id}/stats`,
        { headers: { Authorization: `Bearer ${strava_token}` } }
      )
      dispatch({ type: GET_STRAVA_DATA, payload: res.data })
    } catch (err) {
      dispatch({
        type: STRAVA_ERROR,
        payload: err
      })
    }
  }

  return (
    <StravaContext.Provider
      value={{
        stravaProfile: state.stravaProfile,
        stravaData: state.stravaData,
        error: state.error,
        loading: state.loading,
        getStravaProfile,
        updateStravaProfile,
        getStravaData
      }}
    >
      {props.children}
    </StravaContext.Provider>
  )
}

export default StravaState
