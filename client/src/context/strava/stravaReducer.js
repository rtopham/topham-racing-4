import {
  GET_STRAVA_PROFILE,
  GET_STRAVA_DATA,
  STRAVA_ERROR,
  UPDATE_STRAVA_PROFILE,
  UPDATE_STRAVA_TOKENS,
  SET_LOADING_FALSE,
  SET_LOADING_TRUE
} from '../types'

export default (state, action) => {
  switch (action.type) {
    case GET_STRAVA_PROFILE:
      return {
        ...state,
        stravaProfile: action.payload,
        loading: false
      }

    case GET_STRAVA_DATA:
      return {
        ...state,
        stravaData: action.payload,
        stravaDataLoading: false
      }

    case UPDATE_STRAVA_PROFILE:
    case UPDATE_STRAVA_TOKENS:
      return {
        ...state,
        stravaProfile: action.payload
      }

    case STRAVA_ERROR:
      return {
        ...state,
        error: action.payload
      }
    case SET_LOADING_TRUE:
      return {
        ...state,
        loading: true
      }
    case SET_LOADING_FALSE:
      return {
        ...state,
        loading: false
      }
    default:
      return state
  }
}
