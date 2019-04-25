export const SPINNER_STATUS = "SPINNER_STATUS";

export const spinnerStatus = () => {
  return dispatch => {
    dispatch({ type: SPINNER_STATUS });
  };
};
