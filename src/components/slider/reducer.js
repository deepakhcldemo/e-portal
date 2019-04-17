const intialState = {
    openModalForTeacher : true
}

const sliderReducer = (state = intialState, action) => {
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