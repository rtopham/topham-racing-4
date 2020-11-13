import React, { useReducer } from 'react'
import axios from 'axios'
import AuthContext from './authContext'
import authReducer from './authReducer'
import setAuthToken from '../../utils/setAuthToken'

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

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: localStorage.getItem('token') !== null,
    loading: true,
    user: null,
    banners: null,
    error: null
  }

  const [state, dispatch] = useReducer(authReducer, initialState)

  // Load User

  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token)
    }

    try {
      const res = await axios.get('/api/auth')

      dispatch({ type: USER_LOADED, payload: res.data })
    } catch (err) {
      dispatch({ type: AUTH_ERROR })
    }
  }

  // Update User Profile

  const updateUser = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const res = await axios.put('api/users', formData, config)

      dispatch({ type: UPDATE_USER, payload: res.data })
    } catch (err) {
      dispatch({ type: UPDATE_ERROR, payload: err.response.data.msg })
    }
  }

  // Register User

  const register = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const res = await axios.post('/api/users', formData, config)
      dispatch({ type: REGISTER_SUCCESS, payload: res.data })
      loadUser()
    } catch (err) {
      dispatch({ type: REGISTER_FAIL, payload: err.response.data.msg })
    }
  }

  // Login User

  const login = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const res = await axios.post('/api/auth', formData, config)
      dispatch({ type: LOGIN_SUCCESS, payload: res.data })
      loadUser()
    } catch (err) {
      dispatch({ type: LOGIN_FAIL, payload: err.response.data.msg })
    }
  }

  // Logout User

  const logout = () => dispatch({ type: LOGOUT })

  // Clear Errors

  const clearErrors = () => dispatch({ type: CLEAR_ERRORS })

  // Add New Banner

  const addBanner = async (userId, formData) => {
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data'
      }
    }
    try {
      const res = await axios.post(
        `/api/users/banners/${userId}`,
        formData,
        config
      )
      dispatch({ type: ADD_BANNER, payload: res.data })
      getBanners(userId)
    } catch (err) {
      dispatch({
        type: BANNER_ERROR,
        payload: err.response.msg
      })
    }
  }

  // Delete Banner

  const deleteBanner = async (userId, id) => {
    try {
      const res = await axios.delete(`/api/users/banners/${id}`)
      dispatch({ type: DELETE_BANNER, payload: res.data })
      getBanners(userId)
    } catch (err) {
      dispatch({
        type: BANNER_ERROR,
        payload: err.response.msg
      })
    }
  }

  // Get Banners

  const getBanners = async (userId) => {
    try {
      const res = await axios.get(`/api/users/banners/${userId}`)
      dispatch({ type: GET_BANNERS, payload: res.data })
    } catch (err) {
      dispatch({
        type: BANNER_ERROR,
        payload: err.response.msg
      })
    }
  }

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        banners: state.banners,
        error: state.error,
        register,
        loadUser,
        updateUser,
        login,
        logout,
        clearErrors,
        addBanner,
        deleteBanner,
        getBanners
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState
