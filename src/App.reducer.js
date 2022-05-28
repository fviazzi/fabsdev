const initialState = {
  theme: 'light-theme',
  section: 'intro',
  language: 'en',
  account: {}
}

export const reducer = [reduce, initialState]

function reduce (prevState, action) {

  switch (action.type) {

    case 'MOUNT':
      return {
        ...prevState,
        ...action.data
      }

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
  }
}
