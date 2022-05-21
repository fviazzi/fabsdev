const initialState = {
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
  }
}
