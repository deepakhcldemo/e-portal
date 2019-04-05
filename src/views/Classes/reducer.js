const classReducerState = {
  openModal: false
}

const classReducer = (state = classReducerState, action) => {
  if (action.type === 'close') {
    return {
      ...state,
      openModal: !state.openModal
    }
  }
  if (action.type === 'open') {
    return {
      ...state,
      openModal: !state.openModal
    }
  }

  return state;
}

export default classReducer;