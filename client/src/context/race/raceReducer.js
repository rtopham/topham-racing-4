import {
  ADD_RACE,
  DELETE_RACE,
  FILTER_RACES,
  CLEAR_FILTER,
  UPDATE_RACE,
  RACE_ERROR,
  GET_RACES,
  CLEAR_RACES,
  SET_SELECTED,
  CLEAR_SELECTED,
  SET_DELETE_ALERT,
  REMOVE_DELETE_ALERT
} from '../types'

export default (state, action) => {
  switch (action.type) {
    case GET_RACES:
      return {
        ...state,
        races: action.payload,
        loading: false
      }
    case ADD_RACE:
      return {
        ...state,
        races: [action.payload, ...state.races],
        loading: false
      }
    case UPDATE_RACE:
      return {
        ...state,
        races: state.races.map((race) =>
          race._id === action.payload._id ? action.payload : race
        ),
        loading: false
      }
    case DELETE_RACE:
      return {
        ...state,
        races: state.races.filter((race) => race._id !== action.payload),
        loading: false
      }
    case CLEAR_RACES:
      return {
        ...state,
        races: null,
        filtered: null,
        error: null,
        current: null
      }

    case SET_SELECTED:
      return {
        ...state,
        selectedRace: action.payload
      }
    case CLEAR_SELECTED:
      return {
        ...state,
        selectedRace: null
      }
    case SET_DELETE_ALERT:
      return {
        ...state,
        showDeleteAlert: true
      }
    case REMOVE_DELETE_ALERT:
      return {
        ...state,
        showDeleteAlert: false,
        selectedRace: null
      }

    case FILTER_RACES:
      return {
        ...state,

        filtered: state.races.filter((race) => {
          switch (action.payload) {
            case 'current':
              return (
                new Date(race.race_date).getFullYear() ===
                new Date().getFullYear()
              )
            case 'lastYear':
              return (
                new Date(race.race_date).getFullYear() ===
                new Date().getFullYear() - 1
              )
            case 'ICUP':
              return race.series.match('Intermountain Cup')
            case 'Mid-Week':
              return race.series.match('Mid-Week')
            case 'USAC':
              return race.series.match('USAC')
            case 'Other':
              return (
                race.series !== 'Intermountain Cup' &&
                race.series !== 'Mid-Week' &&
                race.series !== 'USAC'
              )
            case 'Podiums':
              return race.rank <= 3 && race.rank !== 0
            case 'Wins':
              return race.rank === 1
            default:
              return race
          }
        })
      }
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      }
    case RACE_ERROR:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}
