const initialState = {
  theme: 'light-theme',
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
  }
}
