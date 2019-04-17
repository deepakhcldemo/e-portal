const intialState = {
    openModalForTeacher : true,
    teacherDetails : {}
}

const sliderReducer = (state = intialState, action) => {
  debugger
    switch (action.type) {
      case 'OPEN_MODAL':
        return { ...state, 
            openModalForTeacher : !openModalForTeacher
        };
      default:
        return state;
    }
  };
  export default sliderReducer;