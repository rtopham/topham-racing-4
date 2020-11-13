import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  UPDATE_USER,
  UPDATE_ERROR,
  GET_BANNERS,
  BANNER_ERROR,
  ADD_BANNER,
  DELETE_BANNER
} from '../types'

export default (state, action) => {
  switch (action.type) {
    case USER_LOADED:
    case UPDATE_USER:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload
      }
    case UPDATE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case GET_BANNERS:
      return {
        ...state,
        banners: action.payload,
        loading: false
      }
    case ADD_BANNER:
      return {
        ...state,
        loading: false,
        user: action.payload
      }
    case DELETE_BANNER:
      return {
        ...state,
        loading: false,
        user: action.payload
      }
    case BANNER_ERROR:
      return {
        ...state,
        error: action.payload
      }
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token)
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false
      }
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }
    default:
      return state
  }
}
