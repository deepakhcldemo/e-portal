import * as actionTypes from "./actions";
const initialState = {
  spinnerStatus: false
};

const spinnerStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SPINNER_STATUS:
      return {
        ...state,
        spinnerStatus: !state.spinnerStatus
      };
    default:
      return {
        ...state
      };
  }
};

export default spinnerStatusReducer;
