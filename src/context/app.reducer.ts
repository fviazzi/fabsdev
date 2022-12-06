import {Action, State} from './app.types'

const initialState: State = {
  theme: 'light-theme',
  section: 'intro',
  language: 'en'
}

function reducer (prevState = initialState, action: Action):State {

  switch (action.type) {

    case 'UPDATE_THEME':
      return {
        ...prevState,
        theme: action.data
      }

    case 'UPDATE_LANG':
      return {
        ...prevState,
        language: action.data
      }

    case 'UPDATE_SECTION':
      return {
        ...prevState,
        section: action.data
      }

    default:
      return prevState
  }
}

export {reducer, initialState}
